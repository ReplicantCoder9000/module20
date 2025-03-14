# Coding Quiz Application with CI/CD Pipeline

This is a full-stack application with a CI/CD pipeline using GitHub Actions. The application runs Cypress component tests when a Pull Request is made to the develop branch, and automatically deploys to Render when code is merged from develop to the main branch.

## Application Structure

- **Client**: React/TypeScript application built with Vite
- **Server**: Node.js/Express/TypeScript application with MongoDB
- **Testing**: Cypress for component testing

## CI/CD Pipeline Setup

### GitHub Repository Setup

1. Create a new GitHub repository at https://github.com/ReplicantCoder9000/module20
2. Push the code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ReplicantCoder9000/module20.git
   git push -u origin main
   ```
3. Create a develop branch:
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

### Render Deployment Setup

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - **Name**: coding-quiz (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm run start`
   - **Auto-Deploy**: Turn OFF
4. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 3001 (or your preferred port)
5. Get the Deploy Hook URL:
   - Go to the Settings tab
   - Scroll down to the "Deploy Hooks" section
   - Create a new Deploy Hook
   - Copy the URL

### GitHub Secrets Setup

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add a new repository secret:
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: The Deploy Hook URL you copied from Render

## Workflow

### Development Workflow

1. Create a feature branch from the develop branch:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them
3. Push your feature branch to GitHub:
   ```bash
   git push -u origin feature/your-feature-name
   ```
4. Create a Pull Request to the develop branch
5. GitHub Actions will automatically run the Cypress component tests
6. If the tests pass, merge the Pull Request to the develop branch

### Deployment Workflow

1. Create a Pull Request from the develop branch to the main branch
2. Review the changes and merge the Pull Request
3. GitHub Actions will automatically deploy the application to Render

## GitHub Actions Workflows

### Cypress Tests Workflow

This workflow runs when a Pull Request is made to the develop branch. It:
- Checks out the code
- Sets up Node.js
- Installs dependencies
- Runs Cypress component tests
- Uploads test results as artifacts

### Render Deploy Workflow

This workflow runs when code is pushed to the main branch. It:
- Checks out the code
- Triggers a deployment on Render using the Deploy Hook URL

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run develop
   ```
3. Run Cypress component tests:
   ```bash
   npm run test-component
   ```
4. Run Cypress tests in GUI mode:
   ```bash
   npm run test-gui
   ```

## Testing the CI/CD Pipeline

This note was added to test the CI/CD pipeline. When this change is pushed to a feature branch and a Pull Request is created to the develop branch, GitHub Actions should automatically run the Cypress component tests. When the PR is merged to develop and then to main, the application should be automatically deployed to Render.