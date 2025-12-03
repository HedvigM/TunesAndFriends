/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13.4+ (stable in Next.js 16)
  // Both Pages Router and App Router can coexist during migration
  // Pages Router: pages/ directory
  // App Router: app/ directory
  
  reactStrictMode: true,
  
  // SASS support (already configured via sass package)
  sassOptions: {
    // Optional: Add any SASS options if needed
  },

  // TypeScript configuration is handled in tsconfig.json
  typescript: {
    // Set to false if you want to ignore TypeScript errors during build
    // For production, keep this as true or remove to use default (true)
    ignoreBuildErrors: false,
  },
  
  // Note: ESLint configuration is now handled via next lint command
  // and eslint.config.js/.eslintrc.json files, not in next.config.js
};

module.exports = nextConfig;

