# @equinor/engineering-symbols-web

# Preview 🧸

[Engineering symbols web](https://engineering-symbols.equinor.com/)

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
-   **Release Please**: GitHub Action for automated release management.
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
