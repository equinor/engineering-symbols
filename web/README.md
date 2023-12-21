# @equinor/engineering-symbols-web

# Preview 🧸

[Engineering symbols (prod)](https://engineering-symbols.equinor.com/)
<br>
[Engineering symbols (dev)](https://webdev-engineering-symbols-dev.radix.equinor.com/)

## Available Scripts

Install:

### `npm install`

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run lint`

Launches the lint runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Environments

Default branch - `develop`. All PR's are first added to `develop` using **Squash and merge**.

Release is done using PR from `develop` to `master`. The title should include next copy: _Release 20.12.2023_ and only merged only with **Merge pull request** ❗️

[Production](https://engineering-symbols.equinor.com)<br>
[Development](https://webdev-engineering-symbols-dev.radix.equinor.com/)

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

# Symbols Library Documentation

## Overview

This repository contains the reference implementation of a library for machine-readable symbols designed for use in digital diagrams. Additionally, it includes drafts for an information model to support machine-readable engineering symbols. The project is built using the following technologies:

-   **Next.js**: A React framework for building modern web applications.
-   **PullState**: A state management library for React applications.
-   **Styled-components**: CSS-in-JS library for styling components.
-   **MSAL (Microsoft Authentication Library)**: Used for authorization and authentication.
-   **Snyk**: Dependency vulnerability scanning.
-   **Husky**: Git hooks for enforcing code quality.
-   **Prettier**: Code formatting.
-   **ESLint**: JavaScript linting tool.
-   **GitHub Actions (GHA)**: Used for building and deploying the project.
-   **Semantic Release**: GitHub Action for automated release management.
-   **Radix**: [Deployment platform](https://console.radix.equinor.com/applications/engineering-symbols/envs).
-   **Docker**: Containerization for deployment.

## Project Structure

The project follows a structured directory layout:

-   **API**: Contains API-related code.
-   **Components**: Reusable React components.
-   **Helpers**: Utility functions.
-   **Pages**: Next.js pages.
-   **Store**: State management using PullState.
-   **Styles**: Styled-components styling.
-   **Utils**: Utility functions related to authentication and authorization.
-   **Types**: Type definitions and interfaces.

## Release Rules

We follow the following release rules to categorize our changes:

-   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
-   `ci`: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
-   `docs`: Documentation only changes
-   `feat`: A new feature
-   `fix`: A bug fix
-   `perf`: A code change that improves performance
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `test`: Adding missing tests or correcting existing tests

## Deployment

The project is deployed to Radix using Docker configuration. GitHub Actions (GHA) is used for building and deploying the application. We utilize the "release-please" GitHub Action to manage releases automatically.

## User roles

![User roles](./images/user_roles.png 'User roles')

## Uploading SVG workflow

![Uploading SVG workflow](./images/uploading-svg-workflow.png 'SVG workflow')
![Uploading SVG workflow](./images/uploading-svg-workflow_2.png 'SVG workflow')

# Azure Superadmin Group Assignment

To grant a user superadmin privileges in Azure, follow the steps below:

1. **Navigate to the Azure Portal:**
   Open your web browser and go to Azure Portal [Engineering Symbols - authentication](https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/ce4e0e3c-0655-4019-a4a1-f60faabeb143/appId/2e4ccc3b-9d87-4a03-af5f-ae1188027d40).

2. **Sign In:**
   Sign in with your administrator credentials.

3. **Access Azure Active Directory:**
   In the left-hand navigation pane, click on **Azure Active Directory**.

4. **Select Users and groups**

5. **Locate the User:**
   Find and select the user to whom you want to grant superadmin access.

6. **Assign User to Superadmin Group:**

    - Click on the **Directory role** tab.
    - In the **Roles** section, click on **Add role assignment**.
    - Choose **Super users** or a custom role that includes the necessary permissions.
    - Click **Add members** and select the user you want to add.
    - Click **Add** to confirm the assignment.

7. **Save Changes:**
   Ensure to save your changes by clicking **Save** or **Review + save** depending on the Azure Portal version.

The user is now assigned to the superadmin group and has the necessary permissions to approve symbols.
