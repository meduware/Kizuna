# Kizuna - Privacy-Focused Communication Platform

## Overview

Kizuna is a privacy-focused, self-hosted communication platform for communities and businesses. Users can experience decentralized messaging by running their own servers.

## Installation

To run the project on your device, follow the steps below:

1. Clone this repository:

   ```bash
   git clone git@github.com:MedusaCollins/Kizuna.git kizuna
   ```

2. Clone this repository:

   ```bash
   cd kizuna 
   ```

3. Install the required dependencies:

   ```bash
   npm i
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The project will start at `http://localhost:3000`.

## Project Structure

Here’s an overview of the directories we use and their purposes:

   ```
   kizuna/
   ├── ...
   └── workspaces/                 # All packages live here
       ├── client/                 # Your existing Next.js app
       │   ├── pages/              # Documentation page
       │   ├── public/             # Static assets
       │   ├── src/                # Source code
       │   │   ├── app/            # Next.js app directory
       │   │   ├── components/     # React components
       │   │   ├── context/        # Contains React context providers
       │   │   ├── lib/            # Holds shared libraries, configuration
       │   │   ├── hooks/          # Contains custom React hooks
       │   │   ├── utils/          # Stores helper functions
       │   │   └── ...
       │   └── ...
       ├── server/                 # New Node.js backend
       │   ├── src/                # Source code
       │   │   ├── index.ts        # Server entry point
       │   │   ├── routes/         # API route handlers
       │   │   ├── controllers/    # Business logic
       │   │   ├── services/       # Service layer
       │   │   ├── models/         # Data models
       │   │   ├── middleware/     # Express middleware
       │   │   ├── utils/          # Utility functions
       │   │   └── config/         # Configuration
       │   ├── dist/               # Compiled JavaScript
       │   └── ...
       └── shared/                 # Shared code between client and server
           ├── src/                # Source code
           │   ├── types/          # Shared TypeScript types/interfaces
           │   ├── constants/      # Shared constants
           │   ├── utils/          # Shared utility functions
           │   └── ...
           └── ...

   ```

## Contribution Guideline
We welcome contributions! Here's how you can contribute:

### Setting Up the Development Environment

1.Before starting development, run the following commands:

   ```bash
   git clone git@github.com:MedusaCollins/Kizuna.git kizuna
   cd kizuna
   ```

### Development Process

1. Update the main and develop branches:
   ```bash
   git checkout main
   git pull origin main
   git checkout develop
   git pull origin develop
   ```
   
> [!NOTE]
> If the change you want to work on is not in the issue list, first open an issue related to the problem

3. Create a branch for the change you want to make:
   ```bash
   git checkout -b <type>/<development-name>
   ```
   
> [!NOTE]
> Available **type** names;
>
> - **feat**: Adding a new feature
> - **refactor**: Code refactoring, performance improvements
> - **docs**: Documentation update
> - **fix**: Bug fix
> - **hotfix**: Emergency bug fixes

> For example, you can create a branch like:
>
> ```bash
>    git checkout -b feat:setting-page
> ```

4. After making changes, make sure there are no issues by following these steps:

   ```bash
     git checkout develop
     git pull origin develop
     git checkout <3. aşamada oluşturmuş olduğunuz branch ismi>
     git rebase develop
     npm run build
   ```

> [!CAUTION]
> - This step checks if your changes cause any issues in the project. Do not proceed to the next step without resolving any issues encountered!
> - Only use the main branch for hotfixes. For all other situations, use the develop branch.

5. If there are no issues, commit your changes with a message like this:

   ```bash
    git commit -m "<type>: A short summary of your change. (#<issueId>)"
   ```

> For example:
>
> ```bash
>     git commit -m "docs: Updated the contributing section in README.md. (#19)"
> ```

> [!TIP]
> If you’re committing for an urgent fix, you can indicate it with "(main)" before the #issueId, so reviewers know it’s meant for the main branch.

6. Push your changes:
   ```bash
   git push origin <branch-name>
   ```
7. Go to Github and create a **Pull Request (PR)**.
> [!NOTE]
> Except for hotfixes, submit all PRs to the develop branch.

Please follow our coding standards to ensure the project progresses smoothly.
