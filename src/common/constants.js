// Application
export const APP = {
  NAME: "App",
};

// CORS
export const CORS = {
  WHITELIST: process.env.APP_CORS_ALLOWED_DOMAINS,
};

// Database
export const DATABASE = {
  CONNECTION_STRING: process.env.APP_MONGODB_CONNECTION_STRING,
};

// Sentry
export const SENTRY = {
  DSN: process.env.APP_SENTRY_DSN,
  ENV: process.env.APP_SENTRY_ENV,
};
