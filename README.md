# Kizuna

## Overview
Kizuna is a self-hosted, open-source chat application designed for secure and private communication.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/MedusaCollins/Kizuna.git
    cd Kizuna
   
2. **Install Dependencies:**

    ```bash
    npm install
   
3. **Environment Variables:**\
Copy `.env.example` to `.env`and configure the following variables:

- `MONGODB_URI`: Your MongoDB connection string.
- `ENCRYPTION_SECRET`: Secret for encryption.
- `ENCRYPTION_SALT`: Salt for encryption.

4. **Running the Application:**

- Development: 
    ``` bash
    npm run dev
- Production Build:
    ``` bash
    npm run build
    npm run start

## Usage
- Access the application at `http://localhost:3000`.
- Use the built-in authentication features to start chatting securely.

## Project Structure

- `pages/`: Next.js page components.
- `components/`: UI components for the chat interface.
- `styles/`: Global and component-level styles using Tailwind CSS.
- `tsconfig.json`: TypeScript configuration settings.
- `next.config.mjs`: Configuration file for Next.js settings and environment variables.

## Contribution Guidelines

1. **Fork the Repository**: Create a fork and clone it to your local machine.
2. **Create a New Branch**: Use a descriptive branch to differentiate from main branch.
3. **Code Standards**: Follow the `.eslintrc.json` standards, extending `next/core-web-vitals`.
4. **Submit a Pull Request**: Once changes are committed, push to your fork and create a PR to the main repository.
