/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    USERS_API: process.env.USERS_API,
    LOGIN_API: process.env.LOGIN_API,
    REGISTER_API: process.env.REGISTER_API,
    ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
    REGISTER_API: process.env.REGISTER_API,
    VERIFY_API: process.env.VERIFY_API,
    SALES_API: process.env.SALES_API,
    SALES_DETAIL_API: process.env.SALES_DETAIL_API,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_REPO: process.env.PROJECT_REPO,
  },
};

export default nextConfig;
