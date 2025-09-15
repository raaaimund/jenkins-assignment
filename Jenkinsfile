pipeline {
    agent any
    
    options {
        // Keep builds for 30 days
        buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '10'))
        // Timeout the build after 10 minutes
        timeout(time: 10, unit: 'MINUTES')
    }
    
    environment {
        // Define environment variables
        NODE_ENV = 'production'
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Checking out source code...'
                // Code is automatically checked out, but we can add verification
                sh 'ls -la'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running test suite...'
                sh 'npm test'
            }
            post {
                always {
                    echo '📊 Test stage completed'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                echo '🔨 Building application...'
                sh 'npm run build'
                
                echo '📋 Verifying build output...'
                sh 'ls -la dist/'
                sh 'cat dist/manifest.json'
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo '📦 Archiving build artifacts...'
                // Archive the built files
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
                
                echo '📄 Publishing HTML reports...'
                // Publish HTML reports (this is the main requirement for Assignment 2)
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'dist',
                    reportFiles: 'index.html',
                    reportName: 'Application Report',
                    reportTitles: 'Jenkins Assignment - Main Application'
                ])
                
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'dist',
                    reportFiles: 'build-report.html',
                    reportName: 'Build Report',
                    reportTitles: 'Jenkins Assignment - Build Report'
                ])
            }
        }
    }
    
    post {
        always {
            echo '🏁 Pipeline execution completed'
            // Clean workspace if needed
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully!'
            // You can add notifications here (email, Slack, etc.)
        }
        failure {
            echo '❌ Pipeline failed!'
            // You can add failure notifications here
        }
        unstable {
            echo '⚠️ Pipeline completed with warnings'
        }
    }
}