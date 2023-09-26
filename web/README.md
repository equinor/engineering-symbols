# @equinor/engineering-symbols-web

# Preview 🧸

[Engineering symbols web](https://web-engineering-symbols-prod.radix.equinor.com/)

[Engineering symbols web (dev)](https://web-engineering-symbols-dev.radix.equinor.com/)

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

-   `feat` and `feature`: New features.
-   `fix`: Bug fixes.
-   `perf`: Performance improvements.
-   `revert`: Reverted changes.
-   `docs`: Documentation updates.
-   `style`: Styling changes.
-   `chore`: Miscellaneous chores.
-   `bump(package)`, `bump(iconor)`, `bump(web)`, `bump`: Bump package versions.
-   `refactor`: Code refactoring.
-   `test`: Test-related changes.
-   `build`: Build system changes.
-   `ci`: Continuous integration updates.

## Deployment

The project is deployed to Radix using Docker configuration. GitHub Actions (GHA) is used for building and deploying the application. We utilize the "release-please" GitHub Action to manage releases automatically.

## ENV's

```
NEXT_PUBLIC_MSAL_CLIENT_ID
NEXT_PUBLIC_MSAL_AUTHORITY
NEXT_PUBLIC_API_SCOPE
```

## User roles

![User roles](./images/user_roles.png 'User roles')

## Uploading SVG workflow

![Uploading SVG workflow](./images/uploading-svg-workflow.png 'SVG workflow')
![Uploading SVG workflow](./images/uploading-svg-workflow_2.png 'SVG workflow')
