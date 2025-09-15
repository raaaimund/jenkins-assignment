# Jenkins Assignment

This repository contains two practical assignments designed to help you learn Jenkins CI/CD pipeline concepts. The project includes a simple Node.js application that generates static HTML files, which serves as the foundation for both assignments.

## Project Overview

The project is a lightweight Node.js application that:
- Generates static HTML files with build reports
- Includes a test suite to validate functionality
- Produces build artifacts (HTML reports and JSON manifest)
- Demonstrates CI/CD pipeline best practices

### Project Structure

```
jenkins-assignment/
├── src/
│   ├── index.js      # Main HTML generator application
│   ├── build.js      # Build script that creates static HTML
│   └── test.js       # Test suite
├── dist/             # Generated build artifacts (created after build)
├── package.json      # Node.js project configuration
└── README.md         # This file
```

### Quick Start

```bash
# Install dependencies (currently no external dependencies)
npm install

# Run the application
npm start

# Build the project (generates static HTML files)
npm run build

# Run tests
npm test

# Clean build artifacts
npm run clean
```

## Assignment 1: Webhook Setup and Jenkins Pipeline Configuration

### Objective
Configure a webhook from this GitHub repository to trigger a Jenkins pipeline automatically when code changes are pushed.

### Steps to Complete

1. **Create Jenkins Pipeline Job**
   - Create new Pipeline job in Jenkins
   - Configure Pipeline script from SCM
   - Set repository URL and branch

2. **Create Jenkinsfile**
   - Create a Jenkinsfile in the repository root
   - Use docker agent with docker-workflow plugin (any node docker image)
   - Define pipeline stages for checkout, install, test, build, and archive
   - Include HTML report publishing configuration

3. **Configure GitHub Webhook** 
   - Add webhook in GitHub repository settings
   - Set payload URL to Jenkins webhook endpoint
   - Configure for push events

4. **Configure Jenkins GitHub Integration**
   - Enable GitHub hook trigger in Jenkins job
   - Set up polling configuration

5. **Test the Webhook**
   - Make a change and push to repository
   - Verify Jenkins automatically triggers build
   - Check console output for successful execution

### Expected Results
- ✅ Push to GitHub automatically triggers Jenkins build
- ✅ Jenkins pulls latest code from repository
- ✅ Pipeline executes all stages successfully
- ✅ Build artifacts are generated and archived

### Troubleshooting Tips
- Ensure Jenkins is accessible from the internet (for GitHub webhooks)
- Check Jenkins logs if webhook isn't triggering builds
- Verify GitHub webhook delivery in repository settings
- Confirm Jenkins has proper Git credentials if repository is private

---

## Assignment 2: Building Node Project and Publishing HTML Reports

### Objective
Configure the Jenkins pipeline to build the Node.js project and publish the generated HTML files as reports that can be viewed directly in Jenkins.

### Required Pipeline Features

Your Jenkinsfile should include:

#### 1. **Multi-Stage Pipeline**
- **Checkout**: Verify source code and environment
- **Install Dependencies**: Run `npm install` 
- **Run Tests**: Execute test suite with `npm test`
- **Build Application**: Create static HTML files with `npm run build`
- **Archive Artifacts**: Save build outputs and publish HTML reports

#### 2. **HTML Report Publishing**
The pipeline should publish HTML reports for:
- **Application Report** (`index.html`): Main application output
- **Build Report** (`build-report.html`): Build statistics and system information

#### 3. **Artifact Management**
- Archive all files in `dist/` directory
- Make reports accessible through Jenkins UI

### Steps to Complete

1. **Configure Pipeline Stages**
   - Create multi-stage pipeline with checkout, install, test, build, archive
   - Use appropriate npm commands for each stage

2. **Implement HTML Publishing**
   - Use `publishHTML` directive to publish reports
   - Configure separate reports for application and build outputs

3. **Run the Pipeline**
   - Trigger build manually or via webhook
   - Monitor pipeline execution in Jenkins UI

4. **Access HTML Reports**
   - Verify reports appear in Jenkins sidebar after successful build
   - Test report accessibility and content

### Expected Results
- ✅ Pipeline builds the Node.js project successfully
- ✅ Static HTML files are generated in `dist/` directory
- ✅ HTML reports are published and accessible in Jenkins UI
- ✅ Reports display correctly with proper styling
- ✅ Build artifacts are archived for future reference

### Advanced Features (Optional)
- **Email notifications** on build success/failure

### Troubleshooting
- If HTML reports don't appear, verify HTML Publisher plugin is installed
- Check Jenkins console output for any publishing errors
- Ensure `dist/` directory contains HTML files after build
- Verify file permissions allow Jenkins to read generated files

---

## Learning Outcomes

After completing both assignments, you will have learned:

1. **CI/CD Pipeline Fundamentals**
   - Automated build triggers via webhooks
   - Multi-stage pipeline design
   - Build artifact management

2. **Jenkins Configuration**
   - Pipeline as Code with Jenkinsfile
   - Plugin integration and usage
   - HTML report publishing

3. **Git Integration**
   - Webhook configuration
   - Automated deployment workflows
   - Source code management best practices

4. **Node.js Build Process**
   - NPM script configuration
   - Static asset generation
   - Test automation