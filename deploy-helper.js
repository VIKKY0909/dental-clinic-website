// Deployment Helper Script
// This script helps you prepare your website for secure deployment

const fs = require('fs');
const path = require('path');

class DeploymentHelper {
    constructor() {
        this.configTemplate = 'config.production.js';
        this.configFile = 'config.js';
        this.gitignoreFile = '.gitignore';
    }

    // Check if config.js contains placeholder values
    checkConfig() {
        try {
            const configContent = fs.readFileSync(this.configFile, 'utf8');
            const hasPlaceholders = configContent.includes('YOUR_WEB3FORMS_ACCESS_KEY') || 
                                  configContent.includes('YOUR_IMGBB_API_KEY');
            
            if (hasPlaceholders) {
                console.log('⚠️  WARNING: config.js contains placeholder values');
                console.log('   You need to replace them with your actual API keys before deployment');
                return false;
            } else {
                console.log('✅ config.js appears to be configured with real API keys');
                return true;
            }
        } catch (error) {
            console.log('❌ Error reading config.js:', error.message);
            return false;
        }
    }

    // Create production config from template
    createProductionConfig() {
        try {
            if (fs.existsSync(this.configTemplate)) {
                fs.copyFileSync(this.configTemplate, this.configFile);
                console.log('✅ Created config.js from production template');
                console.log('   Please edit config.js with your actual API keys');
                return true;
            } else {
                console.log('❌ Production template not found:', this.configTemplate);
                return false;
            }
        } catch (error) {
            console.log('❌ Error creating production config:', error.message);
            return false;
        }
    }

    // Update .gitignore to exclude config files
    updateGitignore() {
        try {
            let gitignoreContent = '';
            if (fs.existsSync(this.gitignoreFile)) {
                gitignoreContent = fs.readFileSync(this.gitignoreFile, 'utf8');
            }

            const additions = [
                '# Configuration files with sensitive data',
                'config.js',
                '*.env',
                '.env.*',
                '# Production configs',
                'config.production.js'
            ];

            let needsUpdate = false;
            additions.forEach(addition => {
                if (!gitignoreContent.includes(addition)) {
                    gitignoreContent += '\n' + addition;
                    needsUpdate = true;
                }
            });

            if (needsUpdate) {
                fs.writeFileSync(this.gitignoreFile, gitignoreContent);
                console.log('✅ Updated .gitignore to exclude sensitive files');
            } else {
                console.log('✅ .gitignore already up to date');
            }
            return true;
        } catch (error) {
            console.log('❌ Error updating .gitignore:', error.message);
            return false;
        }
    }

    // Validate deployment readiness
    validateDeployment() {
        console.log('🔍 Checking deployment readiness...\n');

        const checks = [
            { name: 'Config file exists', check: () => fs.existsSync(this.configFile) },
            { name: 'Config has real keys', check: () => this.checkConfig() },
            { name: 'Gitignore updated', check: () => this.updateGitignore() }
        ];

        let allPassed = true;
        checks.forEach(check => {
            const passed = check.check();
            if (!passed) allPassed = false;
        });

        console.log('\n' + '='.repeat(50));
        if (allPassed) {
            console.log('✅ Ready for deployment!');
            console.log('   Your website is configured securely');
        } else {
            console.log('❌ Not ready for deployment');
            console.log('   Please fix the issues above before deploying');
        }

        return allPassed;
    }

    // Show deployment instructions
    showInstructions() {
        console.log('\n📋 Deployment Instructions:');
        console.log('1. Replace placeholder values in config.js with your actual API keys');
        console.log('2. Test your forms locally to ensure they work');
        console.log('3. Deploy to your chosen platform');
        console.log('4. Verify forms work on the live site');
        console.log('\n📖 For detailed instructions, see SECURE_DEPLOYMENT_GUIDE.md');
    }
}

// Run the helper
const helper = new DeploymentHelper();

console.log('🚀 Dental Clinic Website Deployment Helper\n');

// Check if we're in a Node.js environment
if (typeof require !== 'undefined') {
    helper.validateDeployment();
    helper.showInstructions();
} else {
    console.log('This script should be run with Node.js:');
    console.log('node deploy-helper.js');
}
