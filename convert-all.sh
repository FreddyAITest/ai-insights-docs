#!/bin/bash

# Convert Markdown to HTML with proper formatting
convert_md_to_html() {
    input_file="$1"
    output_file="$2"
    
    # Read the markdown file
    content=$(cat "$input_file")
    
    # Create HTML with proper styling
    cat > "$output_file" << 'HTMLHEADER'
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #334155;
            background: #ffffff;
            padding: 2rem;
        }
        .container { max-width: 900px; margin: 0 auto; }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        header a { color: white; text-decoration: none; }
        header a:hover { text-decoration: underline; }
        nav { margin-bottom: 2rem; }
        nav a {
            display: inline-block;
            background: #f8fafc;
            color: #2563eb;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            margin-right: 0.5rem;
            transition: background 0.2s;
        }
        nav a:hover { background: #e2e8f0; }
        h1 { color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem; margin: 2rem 0 1rem; }
        h2 { color: #0f172a; margin: 2rem 0 1rem; font-size: 1.5rem; }
        h3 { color: #334155; margin: 1.5rem 0 0.75rem; font-size: 1.25rem; }
        h4 { color: #64748b; margin: 1rem 0 0.5rem; font-size: 1rem; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
        p { margin-bottom: 1rem; }
        ul, ol { margin-left: 2rem; margin-bottom: 1rem; }
        li { margin-bottom: 0.5rem; }
        pre {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid #e2e8f0;
            margin-bottom: 1rem;
        }
        code {
            background: #f8fafc;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9em;
            border: 1px solid #e2e8f0;
        }
        pre code { background: none; padding: 0; border: none; }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.75rem;
            text-align: left;
        }
        th {
            background: #f8fafc;
            font-weight: 600;
            color: #0f172a;
        }
        tr:nth-child(even) { background: #f8fafc; }
        blockquote {
            border-left: 4px solid #2563eb;
            padding-left: 1rem;
            margin: 1rem 0;
            color: #64748b;
        }
        hr {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 2rem 0;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 2rem;
            background: #2563eb;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover { background: #1d4ed8; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <a href="../index.html" class="back-link">← Back to Documentation</a>
        <nav style="margin-bottom: 2rem;">
            <a href="../index.html">🏠 Home</a>
            <a href="https://github.com/FreddyAITest/ai-insights-docs">GitHub</a>
            <a href="https://illustrious-parfait-00e2cf.netlify.app/">Live Site</a>
        </nav>
HTMLHEADER

    # Process markdown line by line
    in_code_block=false
    in_list=false
    
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Code blocks
        if [[ "$line" =~ ^\`\`\` ]]; then
            if [ "$in_code_block" = true ]; then
                echo "</code></pre>"
                in_code_block=false
            else
                echo "<pre><code>"
                in_code_block=true
            fi
            continue
        fi
        
        if [ "$in_code_block" = true ]; then
            echo "$line" | sed 's/</\&lt;/g; s/>/\&gt;/g'
            continue
        fi
        
        # Headers
        if [[ "$line" =~ ^#\ (.*)$ ]]; then
            echo "<h1>${BASH_REMATCH[1]}</h1>"
        elif [[ "$line" =~ ^##\ (.*)$ ]]; then
            echo "<h2>${BASH_REMATCH[1]}</h2>"
        elif [[ "$line" =~ ^###\ (.*)$ ]]; then
            echo "<h3>${BASH_REMATCH[1]}</h3>"
        elif [[ "$line" =~ ^####\ (.*)$ ]]; then
            echo "<h4>${BASH_REMATCH[1]}</h4>"
        # Bold
        elif [[ "$line" =~ \*\*(.*)\*\* ]]; then
            echo "$line" | sed 's/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g'
        # Links
        elif [[ "$line" =~ \[([^\]]+)\]\(([^\)]+)\) ]]; then
            echo "$line" | sed 's/\[\([^]]*\)\](\([^)]*\))/<a href="\2">\1<\/a>/g'
        # List items
        elif [[ "$line" =~ ^-\ (.*)$ ]] || [[ "$line" =~ ^\*\ (.*)$ ]]; then
            if [ "$in_list" = false ]; then
                echo "<ul>"
                in_list=true
            fi
            echo "  <li>${BASH_REMATCH[1]}</li>"
        # Empty line closes list
        elif [[ -z "$line" ]] && [ "$in_list" = true ]; then
            echo "</ul>"
            in_list=false
            echo ""
        # Regular paragraph
        elif [[ -n "$line" ]]; then
            # Check if it's a table row
            if [[ "$line" =~ ^\| ]]; then
                cells=$(echo "$line" | sed 's/^|//; s/|$//' | sed 's/|/<\/td><td>/g')
                if [[ "$line" =~ ^\|[-:] ]]; then
                    continue  # Skip table separator
                elif [[ "$cells" =~ ^\<td\> ]]; then
                    echo "<tr><td>$cells</td></tr>"
                else
                    echo "<tr><td>$cells</td></tr>"
                fi
            else
                echo "<p>$line</p>"
            fi
        fi
    done <<< "$content"
    
    # Close any open list
    if [ "$in_list" = true ]; then
        echo "</ul>"
    fi

    # Close HTML
    cat >> "$output_file" << 'HTMLFOOTER'
    </div>
</body>
</html>
HTMLFOOTER

    echo "✅ Converted: $output_file"
}

# Convert all markdown files
convert_md_to_html "docs/DNF-GUIDE.md" "docs/DNF-GUIDE.html"
convert_md_to_html "docs/newsletter/SETUP-GUIDE.md" "docs/newsletter/SETUP-GUIDE.html"
convert_md_to_html "docs/research/FREE-SEARCH-APIS-2026.md" "docs/research/FREE-SEARCH-APIS-2026.html"
convert_md_to_html "docs/research/NOTION-SETUP.md" "docs/research/NOTION-SETUP.html"

echo ""
echo "🎉 All files converted!"
