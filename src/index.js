const fs = require('fs');
const path = require('path');

/**
 * Simple Node.js application that generates HTML content
 */
class HtmlGenerator {
    constructor() {
        this.title = 'Jenkins Assignment Demo';
        this.content = [];
    }

    addContent(text) {
        this.content.push(text);
        return this;
    }

    generateHtml() {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 0.5rem; }
        .content { margin: 1rem 0; }
        .timestamp { color: #7f8c8d; font-size: 0.9rem; }
        .success { color: #27ae60; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${this.title}</h1>
        <div class="timestamp">Generated on: ${new Date().toISOString()}</div>
        <div class="content">
            ${this.content.map(item => `<p>${item}</p>`).join('')}
        </div>
        <div class="success">✅ Build completed successfully!</div>
    </div>
</body>
</html>`;
        return html;
    }
}

function main() {
    console.log('🚀 Starting HTML Generator...');
    
    const generator = new HtmlGenerator();
    generator
        .addContent('Welcome to the Jenkins Assignment demo project!')
        .addContent('This is a simple Node.js application that generates static HTML.')
        .addContent('It demonstrates how to build a project and generate reports for Jenkins.')
        .addContent('The application creates HTML files that can be published as Jenkins artifacts.');

    const html = generator.generateHtml();
    console.log('📄 HTML content generated successfully');
    console.log(`📝 Content length: ${html.length} characters`);
    
    return html;
}

if (require.main === module) {
    main();
}

module.exports = { HtmlGenerator, main };