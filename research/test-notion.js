#!/usr/bin/env node

/**
 * Test Notion Connection
 * Quick test to verify Notion integration is working
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnvVar(name) {
    const match = envContent.match(new RegExp(`${name}=(.+)`));
    return match ? match[1].trim() : null;
}

const CONFIG = {
    notionApiKey: getEnvVar('NOTION_API_KEY'),
    notionPageId: getEnvVar('NOTION_PAGE_ID')
};

// Test connection
async function testNotion() {
    console.log('🔍 Testing Notion connection...\n');
    
    if (!CONFIG.notionApiKey) {
        console.log('❌ NOTION_API_KEY not found in .env');
        console.log('   Please add your Notion integration token to .env');
        console.log('   Get it from: https://www.notion.com/my-integrations\n');
        return false;
    }
    
    if (!CONFIG.notionPageId) {
        console.log('⚠️  NOTION_PAGE_ID not set (optional for testing)');
        console.log('   Create a page in Notion and share it with your integration\n');
    }
    
    // Test 1: Get user info
    console.log('Test 1: Checking API connection...');
    
    const userResult = await new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.notion.com',
            path: '/v1/users/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CONFIG.notionApiKey}`,
                'Notion-Version': '2022-06-28'
            }
        }, (res) => {
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
        req.end();
    });
    
    if (userResult.status === 200) {
        console.log(`✅ Connected as: ${userResult.data.name}`);
        console.log(`   Workspace: ${userResult.data.workspace_name || 'Unknown'}`);
        console.log(`   Email: ${userResult.data.person?.email || 'Not available'}\n`);
    } else {
        console.log('❌ Failed to connect to Notion API');
        console.log(`   Status: ${userResult.status}`);
        console.log(`   Error: ${JSON.stringify(userResult.data)}\n`);
        return false;
    }
    
    // Test 2: Create test page (if page ID provided)
    if (CONFIG.notionPageId) {
        console.log('Test 2: Creating test page...');
        
        const testPage = {
            parent: {
                page_id: CONFIG.notionPageId.replace(/-/g, '')
            },
            properties: {
                title: [
                    {
                        type: 'text',
                        text: {
                            content: `🧪 Test Page - ${new Date().toLocaleString('de-DE')}`
                        }
                    }
                ]
            },
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [{
                            type: 'text',
                            text: {
                                content: 'This is a test page created by the AI Research Automation script. You can delete it.'
                            }
                        }]
                    }
                }
            ]
        };
        
        const pageResult = await new Promise((resolve, reject) => {
            const req = https.request({
                hostname: 'api.notion.com',
                path: '/v1/pages',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.notionApiKey}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json'
                }
            }, (res) => {
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
            req.write(JSON.stringify(testPage));
            req.end();
        });
        
        if (pageResult.status === 200) {
            console.log('✅ Test page created successfully!');
            console.log(`   URL: https://notion.so/${pageResult.data.id.replace(/-/g, '')}`);
            console.log('   (You can delete this test page)\n');
        } else {
            console.log('⚠️  Failed to create test page');
            console.log(`   Status: ${pageResult.status}`);
            console.log(`   Error: ${pageResult.data.message || JSON.stringify(pageResult.data)}\n`);
            console.log('   Make sure you shared the page with your integration!');
            console.log('   In Notion: Page → ... → Connect to → Your integration\n');
        }
    }
    
    console.log('='.repeat(50));
    console.log('✅ Notion integration test completed!\n');
    console.log('Next steps:');
    console.log('1. If tests passed: Run research-automation.js');
    console.log('2. If tests failed: Check .env configuration');
    console.log('3. See NOTION-SETUP.md for detailed instructions\n');
    
    return true;
}

// Run test
testNotion().catch(console.error);
