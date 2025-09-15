const fs = require('fs');
const path = require('path');
const { HtmlGenerator } = require('./index.js');
const { generateBuildReport } = require('./build.js');

/**
 * Simple test suite for the Jenkins Assignment project
 */
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFn) {
        this.tests.push({ name, testFn });
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    async run() {
        console.log('🧪 Running test suite...\n');
        
        for (const { name, testFn } of this.tests) {
            try {
                console.log(`▶️  ${name}`);
                await testFn();
                console.log(`✅ PASS: ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ FAIL: ${name} - ${error.message}`);
                this.failed++;
            }
            console.log('');
        }

        console.log('📊 Test Results:');
        console.log(`   Passed: ${this.passed}`);
        console.log(`   Failed: ${this.failed}`);
        console.log(`   Total:  ${this.tests.length}`);
        
        if (this.failed > 0) {
            console.log('\n❌ Some tests failed!');
            process.exit(1);
        } else {
            console.log('\n✅ All tests passed!');
            process.exit(0);
        }
    }
}

// Test suite
const runner = new TestRunner();

runner.test('HtmlGenerator should create valid HTML', () => {
    const generator = new HtmlGenerator();
    generator.addContent('Test content');
    const html = generator.generateHtml();
    
    runner.assert(html.includes('<!DOCTYPE html>'), 'Should contain DOCTYPE');
    runner.assert(html.includes('Test content'), 'Should contain test content');
    runner.assert(html.includes('<html'), 'Should contain html tag');
    runner.assert(html.includes('</html>'), 'Should close html tag');
});

runner.test('HtmlGenerator should handle multiple content items', () => {
    const generator = new HtmlGenerator();
    generator
        .addContent('First item')
        .addContent('Second item');
    
    const html = generator.generateHtml();
    runner.assert(html.includes('First item'), 'Should contain first item');
    runner.assert(html.includes('Second item'), 'Should contain second item');
});

runner.test('Build process should create output files', () => {
    const result = generateBuildReport();
    
    runner.assert(result.success === true, 'Build should succeed');
    runner.assert(typeof result.duration === 'number', 'Should return duration');
    runner.assert(Array.isArray(result.files), 'Should return files array');
    
    // Check if files were actually created
    const distDir = path.join(__dirname, '..', 'dist');
    runner.assert(fs.existsSync(path.join(distDir, 'index.html')), 'index.html should exist');
    runner.assert(fs.existsSync(path.join(distDir, 'build-report.html')), 'build-report.html should exist');
    runner.assert(fs.existsSync(path.join(distDir, 'manifest.json')), 'manifest.json should exist');
});

runner.test('Generated HTML files should be valid', () => {
    const distDir = path.join(__dirname, '..', 'dist');
    const indexPath = path.join(distDir, 'index.html');
    const reportPath = path.join(distDir, 'build-report.html');
    
    if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        runner.assert(indexContent.includes('<!DOCTYPE html>'), 'index.html should be valid HTML');
        runner.assert(indexContent.includes('Jenkins Assignment'), 'index.html should contain title');
    }
    
    if (fs.existsSync(reportPath)) {
        const reportContent = fs.readFileSync(reportPath, 'utf8');
        runner.assert(reportContent.includes('<!DOCTYPE html>'), 'build-report.html should be valid HTML');
        runner.assert(reportContent.includes('Build Report'), 'build-report.html should contain report title');
    }
});

// Run tests
if (require.main === module) {
    runner.run();
}