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
├── Jenkinsfile       # Pipeline definition for Jenkins
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

#### 1. Jenkins Setup
1. **Install Jenkins** on your server or use a cloud-based Jenkins instance
2. **Install required plugins**:
   - GitHub Integration Plugin
   - Pipeline Plugin
   - HTML Publisher Plugin
   - Git Plugin

#### 2. Create Jenkins Pipeline Job
1. Create a new "Pipeline" job in Jenkins
2. Configure the job:
   - **Name**: `jenkins-assignment-pipeline`
   - **Type**: Pipeline
   - **Pipeline Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/raaaimund/jenkins-assignment.git`
   - **Branch**: `*/main` (or your default branch)
   - **Script Path**: `Jenkinsfile`

#### 3. Configure GitHub Webhook
1. **In GitHub Repository Settings**:
   - Go to Settings → Webhooks
   - Click "Add webhook"
   - **Payload URL**: `http://YOUR_JENKINS_URL/github-webhook/`
   - **Content type**: `application/json`
   - **Which events**: Select "Just the push event"
   - **Active**: ✅ Checked

2. **Configure Jenkins GitHub Integration**:
   - In Jenkins job configuration
   - Under "Build Triggers"
   - Check "GitHub hook trigger for GITScm polling"

#### 4. Test the Webhook
1. Make a small change to this README file
2. Commit and push to the repository
3. Verify that Jenkins automatically triggers a build
4. Check the Jenkins console output for successful execution

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

### Pipeline Features Implemented

The `Jenkinsfile` in this repository includes:

#### 1. **Multi-Stage Pipeline**
- **Checkout**: Verifies source code and environment
- **Install Dependencies**: Runs `npm install` 
- **Run Tests**: Executes the test suite with `npm test`
- **Build Application**: Creates static HTML files with `npm run build`
- **Archive Artifacts**: Saves build outputs and publishes HTML reports

#### 2. **HTML Report Publishing**
The pipeline publishes two types of HTML reports:

**Application Report** (`index.html`):
- Main application output
- Demonstrates the generated HTML content
- Shows build timestamp and success status

**Build Report** (`build-report.html`):
- Detailed build statistics
- Build duration and system information
- Success/failure status

#### 3. **Artifact Management**
- All files in `dist/` directory are archived
- Build manifest JSON file with metadata
- Reports are accessible through Jenkins UI

### Steps to Complete

#### 1. Verify Pipeline Configuration
1. Ensure the `Jenkinsfile` is in the repository root
2. Review the pipeline stages and understand each step
3. Confirm HTML Publisher plugin is installed in Jenkins

#### 2. Run the Pipeline
1. Trigger a build (manually or via webhook from Assignment 1)
2. Monitor the pipeline execution through Jenkins Blue Ocean or classic UI
3. Verify all stages complete successfully

#### 3. Access HTML Reports
1. **After successful build**:
   - Go to the build page in Jenkins
   - Look for "Application Report" and "Build Report" links in the sidebar
   - Click on the reports to view the generated HTML

2. **Alternative access**:
   - Navigate to job → build number → "Build Artifacts"
   - Download or view HTML files directly

#### 4. Verify Report Content
The HTML reports should contain:
- ✅ Build timestamp and duration
- ✅ System information (Node.js version, platform)
- ✅ Success status indicators
- ✅ Styled HTML with CSS
- ✅ Responsive design

### Expected Results
- ✅ Pipeline builds the Node.js project successfully
- ✅ Static HTML files are generated in `dist/` directory
- ✅ HTML reports are published and accessible in Jenkins UI
- ✅ Reports display correctly with proper styling
- ✅ Build artifacts are archived for future reference

### Advanced Features (Optional)
- **Email notifications** on build success/failure
- **Slack integration** for team notifications  
- **Multiple branch support** with different deployment targets
- **Performance metrics** tracking across builds
- **Custom report styling** and branding

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

## Next Steps

- Explore more advanced Jenkins features (parallel stages, matrix builds)
- Implement deployment stages for different environments
- Add code quality checks (linting, coverage)
- Integrate with monitoring and logging systems