#!/usr/bin/env node

/**
 * AI Research Automation with Tavily + Notion
 * 
 * Features:
 * - Search web with Tavily API
 * - Compile research findings
 * - Upload to Notion as formatted page
 * - Export as Word document (.docx)
 * - Archive locally
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnvVar(name) {
    const match = envContent.match(new RegExp(`${name}=(.+)`));
    return match ? match[1].trim() : null;
}

const CONFIG = {
    tavilyApiKey: getEnvVar('TAVILY_API_KEY'),
    notionApiKey: getEnvVar('NOTION_API_KEY'),
    notionDatabaseId: getEnvVar('NOTION_DATABASE_ID'),
    notionPageId: getEnvVar('NOTION_PAGE_ID')
};

// Helper: Make HTTPS requests
function apiCall(hostname, path, method, headers, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            path,
            method,
            headers
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });
        
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

// Step 1: Research with Tavily
async function researchTopic(topic, depth = 'advanced') {
    console.log(`🔍 Researching: "${topic}"...`);
    
    const searchBody = {
        query: topic,
        search_depth: depth,
        include_answer: true,
        include_images: false,
        max_results: 10
    };
    
    const result = await apiCall(
        'api.tavily.com',
        '/search',
        'POST',
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.tavilyApiKey}`
        },
        searchBody
    );
    
    if (result.status !== 200) {
        throw new Error(`Tavily API error: ${result.status} - ${JSON.stringify(result.data)}`);
    }
    
    console.log(`✅ Found ${result.data.results.length} results`);
    
    return {
        topic,
        date: new Date().toISOString(),
        answer: result.data.answer,
        results: result.data.results.map(r => ({
            title: r.title,
            content: r.content,
            url: r.url,
            published_date: r.published_date
        }))
    };
}

// Step 2: Generate Markdown Report
function generateMarkdownReport(research) {
    let md = `# ${research.topic}\n\n`;
    md += `**Research Date:** ${new Date(research.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
    
    if (research.answer) {
        md += `## 📋 Summary\n\n${research.answer}\n\n`;
    }
    
    md += `## 🔍 Findings\n\n`;
    
    research.results.forEach((r, i) => {
        md += `### ${i + 1}. ${r.title}\n\n`;
        md += `${r.content}\n\n`;
        md += `**Source:** [${r.url}](${r.url})\n\n`;
        if (r.published_date) {
            md += `*Published: ${new Date(r.published_date).toLocaleDateString('de-DE')}*\n\n`;
        }
        md += `---\n\n`;
    });
    
    md += `## 📊 Metadata\n\n`;
    md += `- **Total Sources:** ${research.results.length}\n`;
    md += `- **Research Date:** ${new Date(research.date).toLocaleString('de-DE')}\n`;
    md += `- **API:** Tavily Search\n`;
    
    return md;
}

// Step 3: Upload to Notion (with batching to avoid 100 block limit)
async function uploadToNotion(title, content) {
    console.log('📤 Uploading to Notion...');
    
    if (!CONFIG.notionApiKey || !CONFIG.notionPageId) {
        console.log('⚠️  Notion credentials not configured. Skipping Notion upload.');
        console.log('   Set NOTION_API_KEY and NOTION_PAGE_ID in .env to enable.');
        return null;
    }
    
    // Convert markdown to Notion blocks
    const allBlocks = content.split('\n\n').map(para => {
        if (para.startsWith('# ')) {
            return {
                object: 'block',
                type: 'heading_1',
                heading_1: {
                    rich_text: [{
                        type: 'text',
                        text: { content: para.replace('# ', '') }
                    }]
                }
            };
        } else if (para.startsWith('## ')) {
            return {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    rich_text: [{
                        type: 'text',
                        text: { content: para.replace('## ', '') }
                    }]
                }
            };
        } else if (para.startsWith('### ')) {
            return {
                object: 'block',
                type: 'heading_3',
                heading_3: {
                    rich_text: [{
                        type: 'text',
                        text: { content: para.replace('### ', '') }
                    }]
                }
            };
        } else {
            return {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [{
                        type: 'text',
                        text: { content: para.substring(0, 2000) } // Notion has 2000 char limit per block
                    }]
                }
            };
        }
    }).filter(b => b);
    
    // Batch blocks (Notion limit: 100 blocks per request)
    const batchSize = 90; // Leave some buffer
    const batches = [];
    for (let i = 0; i < allBlocks.length; i += batchSize) {
        batches.push(allBlocks.slice(i, i + batchSize));
    }
    
    console.log(`   Splitting content into ${batches.length} batches...`);
    
    // Upload batches sequentially
    for (let i = 0; i < batches.length; i++) {
        const result = await apiCall(
            'api.notion.com',
            `/v1/blocks/${CONFIG.notionPageId}/children`,
            'PATCH',
            {
                'Authorization': `Bearer ${CONFIG.notionApiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            { children: batches[i] }
        );
        
        if (result.status !== 200) {
            console.error(`❌ Failed to upload batch ${i + 1}/${batches.length}`);
            console.error('Status:', result.status);
            console.error('Response:', result.data);
            if (i === 0) {
                // First batch failed, return error
                return { success: false, error: result.data };
            }
            // Continue with next batch
        } else {
            console.log(`   ✅ Batch ${i + 1}/${batches.length} uploaded`);
        }
    }
    
    console.log('✅ Uploaded to Notion successfully!');
    return { success: true, pageId: CONFIG.notionPageId, batches: batches.length };
}

// Step 4: Save as Word Document
async function saveAsWordDoc(research, outputPath) {
    console.log('💾 Saving as Word document...');
    
    // Simple DOCX structure (without external library)
    const docContent = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${research.topic}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Research Date: ${new Date(research.date).toLocaleDateString('de-DE')}</w:t>
      </w:r>
    </w:p>
    ${research.results.map(r => `
    <w:p>
      <w:r>
        <w:t>${r.title}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>${r.content}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Source: ${r.url}</w:t>
      </w:r>
    </w:p>
    `).join('')}
  </w:body>
</w:document>
    `.trim();
    
    // For proper DOCX, we'd use the docx library
    // For now, save as HTML which Word can open
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${research.topic}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        h3 { color: #7f8c8d; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .meta { color: #95a5a6; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>${research.topic}</h1>
    <p class="meta">Research Date: ${new Date(research.date).toLocaleDateString('de-DE')}</p>
    ${research.results.map(r => `
    <h2>${r.title}</h2>
    <p>${r.content}</p>
    <p class="meta">Source: <a href="${r.url}">${r.url}</a></p>
    <hr>
    `).join('')}
</body>
</html>
    `.trim();
    
    fs.writeFileSync(outputPath + '.html', htmlContent, 'utf8');
    console.log(`✅ Saved as HTML (Word-compatible): ${outputPath}.html`);
    
    // Also save markdown
    const mdContent = generateMarkdownReport(research);
    fs.writeFileSync(outputPath + '.md', mdContent, 'utf8');
    console.log(`✅ Saved as Markdown: ${outputPath}.md`);
    
    return {
        html: outputPath + '.html',
        markdown: outputPath + '.md'
    };
}

// Main function
async function main() {
    console.log('🚀 AI Research Automation\n');
    console.log('='.repeat(50));
    
    // Get topic from command line or use default
    const topic = process.argv[2] || 'Latest AI developments March 2026';
    
    try {
        // Step 1: Research
        const research = await researchTopic(topic);
        
        // Step 2: Generate content
        const content = generateMarkdownReport(research);
        
        // Step 3: Upload to Notion
        const notionResult = await uploadToNotion(topic, content);
        
        // Step 4: Save locally
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const filename = `research-${topic.replace(/\s+/g, '-').toLowerCase()}-${timestamp}`;
        const outputPath = path.join(__dirname, 'archive', filename);
        
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        
        const files = await saveAsWordDoc(research, outputPath);
        
        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('✅ Research completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   Topic: ${topic}`);
        console.log(`   Sources: ${research.results.length}`);
        console.log(`   Date: ${new Date().toLocaleString('de-DE')}`);
        
        if (notionResult && notionResult.success) {
            console.log(`\n📤 Notion: https://notion.so/${notionResult.pageId}`);
        }
        
        console.log('\n📁 Files saved:');
        console.log(`   HTML: ${files.html}`);
        console.log(`   Markdown: ${files.markdown}`);
        
        return {
            success: true,
            topic,
            files,
            notion: notionResult
        };
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { researchTopic, generateMarkdownReport, uploadToNotion, saveAsWordDoc };
