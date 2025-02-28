import nextra from 'nextra';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_REPO: process.env.PROJECT_REPO,
    MONGODB_URI: process.env.MONGODB_URI,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
    ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_REPO: process.env.PROJECT_REPO,
  },
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
});

export default withNextra(nextConfig);
