// Environment Variables
const {
  CORS_ALLOWED_DOMAINS,
  MONGODB_CONNECTION_STRING,
  SENTRY_ENABLED,
  SENTRY_DSN,
} = process.env;

// Is True
const isTrue = (value) => {
  return value === "true";
};

// Application
export const APP = {
  NAME: "App",
};

// CORS
export const CORS = {
  WHITELIST: CORS_ALLOWED_DOMAINS || [],
};

// Database
export const DATABASE = {
  CONNECTION_STRING: MONGODB_CONNECTION_STRING,
};

// Sentry
export const SENTRY = {
  DSN: SENTRY_DSN,
  ENABLED: isTrue(SENTRY_ENABLED),
};

// Exports
export default {
  APP,
  CORS,
  DATABASE,
  SENTRY,
};
