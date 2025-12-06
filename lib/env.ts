/**
 * Environment Variable Validation
 * This module validates all required environment variables at startup
 * and provides type-safe access to environment configuration.
 */

interface EnvConfig {
  // Database
  DATABASE_URL: string;

  // Auth0
  AUTH0_SECRET: string;
  AUTH0_BASE_URL: string;
  AUTH0_ISSUER_BASE_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;

  // App
  NODE_ENV: 'development' | 'production' | 'test';
}

interface ValidationError {
  variable: string;
  message: string;
}

/**
 * Validates a single environment variable
 */
function validateEnvVar(
  name: keyof EnvConfig,
  value: string | undefined,
  validators: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    customMessage?: string;
  } = {}
): ValidationError | null {
  const { required = true, pattern, minLength, customMessage } = validators;

  // Check if required
  if (required && (!value || value.trim() === '')) {
    return {
      variable: name,
      message: customMessage || `${name} is required but not set`,
    };
  }

  // Skip further validation if not required and empty
  if (!value) return null;

  // Check minimum length
  if (minLength && value.length < minLength) {
    return {
      variable: name,
      message: `${name} must be at least ${minLength} characters long`,
    };
  }

  // Check pattern
  if (pattern && !pattern.test(value)) {
    return {
      variable: name,
      message: customMessage || `${name} format is invalid`,
    };
  }

  return null;
}

/**
 * Validates all environment variables
 */
function validateEnv(): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Database validation
  const databaseError = validateEnvVar('DATABASE_URL', process.env.DATABASE_URL, {
    required: true,
    pattern: /^postgres:\/\/.+/,
    customMessage: 'DATABASE_URL must be a valid PostgreSQL connection string (postgres://...)',
  });
  if (databaseError) errors.push(databaseError);

  // Auth0 Secret validation (should be long and random)
  const secretError = validateEnvVar('AUTH0_SECRET', process.env.AUTH0_SECRET, {
    required: true,
    minLength: 32,
    customMessage: 'AUTH0_SECRET must be at least 32 characters long. Generate with: openssl rand -hex 32',
  });
  if (secretError) errors.push(secretError);

  // Auth0 Base URL validation
  const baseUrlError = validateEnvVar('AUTH0_BASE_URL', process.env.AUTH0_BASE_URL, {
    required: true,
    pattern: /^https?:\/\/.+/,
    customMessage: 'AUTH0_BASE_URL must be a valid URL (http://localhost:3500 or https://yourdomain.com)',
  });
  if (baseUrlError) errors.push(baseUrlError);

  // Auth0 Issuer Base URL validation
  const issuerError = validateEnvVar('AUTH0_ISSUER_BASE_URL', process.env.AUTH0_ISSUER_BASE_URL, {
    required: true,
    pattern: /^https:\/\/.+\.auth0\.com$/,
    customMessage: 'AUTH0_ISSUER_BASE_URL must be a valid Auth0 domain (https://your-tenant.auth0.com or https://your-tenant.eu.auth0.com)',
  });
  if (issuerError) errors.push(issuerError);

  // Auth0 Client ID validation
  const clientIdError = validateEnvVar('AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID, {
    required: true,
    minLength: 10,
  });
  if (clientIdError) errors.push(clientIdError);

  // Auth0 Client Secret validation
  const clientSecretError = validateEnvVar('AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET, {
    required: true,
    minLength: 10,
  });
  if (clientSecretError) errors.push(clientSecretError);

  // Node Environment validation
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && !['development', 'production', 'test'].includes(nodeEnv)) {
    errors.push({
      variable: 'NODE_ENV',
      message: 'NODE_ENV must be one of: development, production, test',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Gets the validated environment configuration
 * Throws an error if validation fails
 */
export function getEnv(): EnvConfig {
  const validation = validateEnv();

  if (!validation.valid) {
    const errorMessage = [
      '❌ Environment variable validation failed:',
      '',
      ...validation.errors.map(err => `  • ${err.variable}: ${err.message}`),
      '',
      '💡 Please check your .env.local file and ensure all required variables are set correctly.',
      '',
    ].join('\n');

    throw new Error(errorMessage);
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    AUTH0_SECRET: process.env.AUTH0_SECRET!,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL!,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL!,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID!,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET!,
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  };
}

/**
 * Validates environment variables and logs any errors
 * Returns true if valid, false otherwise
 */
export function validateEnvironment(): boolean {
  const validation = validateEnv();

  if (!validation.valid) {
    console.error('\n❌ Environment variable validation failed:\n');
    validation.errors.forEach(err => {
      console.error(`  • ${err.variable}: ${err.message}`);
    });
    console.error('\n💡 Please check your .env.local file and ensure all required variables are set correctly.\n');
    return false;
  }

  console.log('✅ Environment variables validated successfully');
  return true;
}

/**
 * Gets environment configuration safely
 * Returns null if validation fails instead of throwing
 */
export function getEnvSafe(): EnvConfig | null {
  try {
    return getEnv();
  } catch (error) {
    return null;
  }
}

// Export individual env vars for convenience (with validation)
let _env: EnvConfig | null = null;

function getValidatedEnv(): EnvConfig {
  if (!_env) {
    _env = getEnv();
  }
  return _env;
}

// Convenience exports
export const env = {
  get DATABASE_URL() { return getValidatedEnv().DATABASE_URL; },
  get AUTH0_SECRET() { return getValidatedEnv().AUTH0_SECRET; },
  get AUTH0_BASE_URL() { return getValidatedEnv().AUTH0_BASE_URL; },
  get AUTH0_ISSUER_BASE_URL() { return getValidatedEnv().AUTH0_ISSUER_BASE_URL; },
  get AUTH0_CLIENT_ID() { return getValidatedEnv().AUTH0_CLIENT_ID; },
  get AUTH0_CLIENT_SECRET() { return getValidatedEnv().AUTH0_CLIENT_SECRET; },
  get NODE_ENV() { return getValidatedEnv().NODE_ENV; },
  get isDevelopment() { return getValidatedEnv().NODE_ENV === 'development'; },
  get isProduction() { return getValidatedEnv().NODE_ENV === 'production'; },
  get isTest() { return getValidatedEnv().NODE_ENV === 'test'; },
};

