#!/usr/bin/env node

/**
 * Environment validation script
 * Run this before starting the dev server to check all environment variables
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_VARS = [
  {
    name: 'DATABASE_URL',
    pattern: /^postgres:\/\/.+/,
    message: 'Must be a valid PostgreSQL connection string (postgres://...)',
  },
  {
    name: 'AUTH0_SECRET',
    minLength: 32,
    message: 'Must be at least 32 characters long. Generate with: openssl rand -hex 32',
  },
  {
    name: 'AUTH0_BASE_URL',
    pattern: /^https?:\/\/.+/,
    message: 'Must be a valid URL (http://localhost:3500 or https://yourdomain.com)',
  },
  {
    name: 'AUTH0_ISSUER_BASE_URL',
    pattern: /^https:\/\/.+\.auth0\.com$/,
    message: 'Must be a valid Auth0 domain (https://your-tenant.auth0.com or https://your-tenant.eu.auth0.com)',
  },
  {
    name: 'AUTH0_CLIENT_ID',
    minLength: 10,
    message: 'Must be at least 10 characters long',
  },
  {
    name: 'AUTH0_CLIENT_SECRET',
    minLength: 10,
    message: 'Must be at least 10 characters long',
  },
];

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('\n❌ .env.local file not found!');
    console.error('\n💡 Create a .env.local file in the project root with the required environment variables.\n');
    return false;
  }

  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        process.env[key] = value;
      }
    });
    return true;
  } catch (error) {
    console.error('\n❌ Error reading .env.local file:', error.message);
    return false;
  }
}

function validateEnvVars() {
  const errors = [];

  REQUIRED_VARS.forEach(({ name, pattern, minLength, message }) => {
    const value = process.env[name];

    // Check if set
    if (!value || value.trim() === '') {
      errors.push({
        variable: name,
        message: `${name} is required but not set`,
      });
      return;
    }

    // Check pattern
    if (pattern && !pattern.test(value)) {
      errors.push({
        variable: name,
        message: `${name}: ${message}`,
      });
      return;
    }

    // Check minimum length
    if (minLength && value.length < minLength) {
      errors.push({
        variable: name,
        message: `${name}: ${message}`,
      });
      return;
    }
  });

  return errors;
}

function main() {
  console.log('🔍 Validating environment variables...\n');

  // Load .env.local file
  if (!loadEnvFile()) {
    process.exit(1);
  }

  // Validate variables
  const errors = validateEnvVars();

  if (errors.length > 0) {
    console.error('❌ Environment variable validation failed:\n');
    errors.forEach(err => {
      console.error(`  • ${err.message}`);
    });
    console.error('\n💡 Please check your .env.local file and fix the errors above.\n');
    process.exit(1);
  }

  console.log('✅ All environment variables are valid!\n');
  
  // Show current configuration (masked sensitive values)
  console.log('📋 Current configuration:');
  console.log(`  • DATABASE_URL: ${process.env.DATABASE_URL.substring(0, 30)}...`);
  console.log(`  • AUTH0_BASE_URL: ${process.env.AUTH0_BASE_URL}`);
  console.log(`  • AUTH0_ISSUER_BASE_URL: ${process.env.AUTH0_ISSUER_BASE_URL}`);
  console.log(`  • AUTH0_CLIENT_ID: ${process.env.AUTH0_CLIENT_ID.substring(0, 10)}...`);
  console.log(`  • AUTH0_SECRET: ${process.env.AUTH0_SECRET.substring(0, 8)}... (${process.env.AUTH0_SECRET.length} chars)`);
  console.log(`  • AUTH0_CLIENT_SECRET: ${process.env.AUTH0_CLIENT_SECRET.substring(0, 8)}... (${process.env.AUTH0_CLIENT_SECRET.length} chars)\n`);

  process.exit(0);
}

main();

