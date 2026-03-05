#!/bin/bash

# Convert Markdown to HTML (Simple Version)
# Usage: ./convert-md-to-html.sh input.md output.html

input_file="$1"
output_file="$2"

if [ ! -f "$input_file" ]; then
    echo "❌ File not found: $input_file"
    exit 1
fi

# Read markdown content
content=$(cat "$input_file")

# Simple markdown to HTML conversion
html_content=$(echo "$content" | \
    sed 's/^# \(.*\)$/<h1>\1<\/h1>/g' | \
    sed 's/^## \(.*\)$/<h2>\1<\/h2>/g' | \
    sed 's/^### \(.*\)$/<h3>\1<\/h3>/g' | \
    sed 's/^#### \(.*\)$/<h4>\1<\/h4>/g' | \
    sed 's/^\- \(.*\)$/<li>\1<\/li>/g' | \
    sed 's/^\* \(.*\)$/<li>\1<\/li>/g' | \
    sed 's/^\*\*\(.*\)\*\*$/<strong>\1<\/strong>/g' | \
    sed 's/^\*\(.*\)\*$/<em>\1<\/em>/g' | \
    sed 's/^\`\`\`\(.*\)$/<pre><code>/g' | \
    sed 's/^\`\``$/<\/code><\/pre>/g' | \
    sed 's/\[\(.*\)\](\(.*\))/<a href="\2">\1<\/a>/g' | \
    sed 's/^\(.*\)$/<p>\1<\/p>/g')

# Create HTML file
cat > "$output_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #334155;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        h1 { color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem; }
        h2 { color: #0f172a; margin-top: 2rem; }
        h3 { color: #334155; }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
        pre { background: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        code { background: #f8fafc; padding: 0.2rem 0.4rem; border-radius: 4px; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left; }
        th { background: #f8fafc; font-weight: 600; }
        ul, ol { margin-left: 2rem; }
        li { margin-bottom: 0.5rem; }
    </style>
</head>
<body>
$html_content
</body>
</html>
EOF

echo "✅ Converted: $output_file"
