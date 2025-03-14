# Setting Up a CI/CD Pipeline with GitHub Actions and Render

This tutorial will guide you through setting up a Continuous Integration (CI) and Continuous Deployment (CD) pipeline using GitHub Actions and Render for a full-stack JavaScript application.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Setting Up the GitHub Repository](#setting-up-the-github-repository)
4. [Configuring GitHub Actions for CI](#configuring-github-actions-for-ci)
5. [Deploying to Render](#deploying-to-render)
6. [Configuring GitHub Actions for CD](#configuring-github-actions-for-cd)
7. [Testing the CI/CD Pipeline](#testing-the-ci-cd-pipeline)
8. [Conclusion](#conclusion)

## Introduction

Continuous Integration (CI) and Continuous Deployment (CD) are essential practices in modern software development. CI ensures that code changes are automatically tested, while CD automates the deployment process. This tutorial will show you how to implement a CI/CD pipeline using GitHub Actions and Render.

## Prerequisites

Before you begin, make sure you have:

- A GitHub account
- A Render account
- A MongoDB Atlas account (or another MongoDB provider)
- Git installed on your local machine
- Node.js and npm installed on your local machine

## Setting Up the GitHub Repository

1. Create a new repository on GitHub:
   - Go to [GitHub](https://github.com) and sign in
   - Click on the "+" icon in the top-right corner and select "New repository"
   - Name your repository (e.g., "module20")
   - Choose the visibility (public or private)
   - Click "Create repository"

2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

3. Add your application code to the repository:
   ```bash
   # Copy your application files to the repository directory
   # Then add, commit, and push the files
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

4. Create a develop branch:
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

## Configuring GitHub Actions for CI

1. Create a `.github/workflows` directory in your repository:
   ```bash
   mkdir -p .github/workflows
   ```

2. Create a YAML file for the CI workflow:
   ```bash
   touch .github/workflows/cypress-tests.yml
   ```

3. Add the following content to the file:
   ```yaml
   name: Cypress Component Tests

   on:
     pull_request:
       branches: [ develop ]

   jobs:
     test:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout code
         uses: actions/checkout@v3
         
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: 18
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Run Cypress component tests
         run: npm run test-component
         
       - name: Upload test results
         uses: actions/upload-artifact@v3
         if: always()
         with:
           name: cypress-results
           path: |
             cypress/videos
             cypress/screenshots
           retention-days: 5
   ```

4. Commit and push the changes:
   ```bash
   git add .github/workflows/cypress-tests.yml
   git commit -m "Add CI workflow for Cypress tests"
   git push
   ```

## Deploying to Render

1. Sign in to [Render](https://render.com) and create a new Web Service:
   - Click on "New" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: Your application name
     - Environment: Node
     - Build Command: `npm run render-build`
     - Start Command: `npm run start`
   - Click "Create Web Service"

2. Configure environment variables:
   - Go to the "Environment" tab
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: 3001 (or your preferred port)
   - Click "Save Changes"

3. Turn off Auto-Deploy:
   - Go to the "Settings" tab
   - Scroll down to the "Auto-Deploy" section
   - Select "No" for "Auto-Deploy"
   - Click "Save Changes"

4. Create a Deploy Hook:
   - Go to the "Settings" tab
   - Scroll down to the "Deploy Hooks" section
   - Click "Add Deploy Hook"
   - Enter a name for the hook (e.g., "GitHub Actions")
   - Click "Create Hook"
   - Copy the URL for the next step

## Configuring GitHub Actions for CD

1. Add the Deploy Hook URL as a GitHub secret:
   - Go to your GitHub repository
   - Click on "Settings"
   - Click on "Secrets and variables" > "Actions"
   - Click "New repository secret"
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: The Deploy Hook URL you copied from Render
   - Click "Add secret"

2. Create a YAML file for the CD workflow:
   ```bash
   touch .github/workflows/render-deploy.yml
   ```

3. Add the following content to the file:
   ```yaml
   name: Deploy to Render

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout code
         uses: actions/checkout@v3
         
       - name: Deploy to Render
         run: |
           curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
         env:
           RENDER_DEPLOY_HOOK_URL: ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
   ```

4. Commit and push the changes:
   ```bash
   git add .github/workflows/render-deploy.yml
   git commit -m "Add CD workflow for Render deployment"
   git push
   ```

## Testing the CI/CD Pipeline

### Testing the CI Pipeline

1. Create a feature branch:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/test-ci
   ```

2. Make a change to the code:
   ```bash
   # Make a change to a file
   git add .
   git commit -m "Test CI pipeline"
   git push -u origin feature/test-ci
   ```

3. Create a Pull Request:
   - Go to your GitHub repository
   - Click on "Pull requests"
   - Click "New pull request"
   - Set "base" to "develop" and "compare" to "feature/test-ci"
   - Click "Create pull request"

4. Check the CI workflow:
   - Go to the "Actions" tab
   - You should see the "Cypress Component Tests" workflow running
   - Wait for it to complete
   - If it passes, merge the Pull Request

### Testing the CD Pipeline

1. Create a Pull Request from develop to main:
   - Go to your GitHub repository
   - Click on "Pull requests"
   - Click "New pull request"
   - Set "base" to "main" and "compare" to "develop"
   - Click "Create pull request"
   - Click "Merge pull request"

2. Check the CD workflow:
   - Go to the "Actions" tab
   - You should see the "Deploy to Render" workflow running
   - Wait for it to complete

3. Check the deployment on Render:
   - Go to your Render dashboard
   - Click on your Web Service
   - Check the "Events" tab to see the deployment status
   - Once deployed, click on the URL to view your application

## Conclusion

Congratulations! You have successfully set up a CI/CD pipeline using GitHub Actions and Render. This pipeline will:

1. Run Cypress component tests when a Pull Request is made to the develop branch
2. Deploy the application to Render when code is merged from develop to main

This setup ensures that your code is tested before it's merged to the develop branch and that your application is automatically deployed when changes are merged to the main branch.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Documentation](https://render.com/docs)
- [Cypress Documentation](https://docs.cypress.io)