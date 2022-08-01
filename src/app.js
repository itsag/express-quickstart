// Modules
import Express, { json } from "express";
import * as Tracing from "@sentry/tracing";
import * as Sentry from "@sentry/node";

// Common
import { SENTRY } from "common/constants";

// Routers
import RootRouter from "routers/root.router";

// Helpers
import DatabaseHelper from "helpers/database.helper";
import CorsHelper from "helpers/cors.helper";

// Create Express Instance
const app = Express();

// Enable Cors
CorsHelper.enableCors(app);

// Inject Sentry
if (SENTRY.ENABLED) {
  Sentry.init({
    dsn: SENTRY.DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

// Sentry: Inject Request Handler
if (SENTRY.ENABLED) {
  app.use(Sentry.Handlers.requestHandler());
}

// Sentry: Inject Tracing Handler
if (SENTRY.ENABLED) {
  app.use(Sentry.Handlers.tracingHandler());
}

// Inject Plugins
app.use(json());

// Inject Routers
app.use("/", RootRouter);

// Sentry: Inject Error Handler
if (SENTRY.ENABLED) {
  app.use(Sentry.Handlers.errorHandler());
}

// Connect to Database
DatabaseHelper.connect().then(
  () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to database.`);

    // eslint-disable-next-line no-console
    console.log(`Sentry is ${SENTRY.ENABLED ? "enabled" : "disabled"}.`);

    // Port
    const port = process.env.PORT || 5000;

    // Start Server
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`We are live on ${port}!`);
    });
  },
  (reason) => {
    Sentry.captureException(reason);

    // eslint-disable-next-line no-console
    console.error(`Failed to connect to the database!`);
  }
);
