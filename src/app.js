// Modules
import Cors from "cors";
import Mongoose from "mongoose";
import Express, { json } from "express";
import * as Tracing from "@sentry/tracing";
import * as Sentry from "@sentry/node";

// Common
import { CORS, DATABASE, SENTRY } from "common/constants";

// Routers
import { rootRouter } from "routers/root.router";

// Create Express Instance
const app = Express();

// Configure CORS
app.use(Cors({ origin: CORS.WHITELIST }));

// Inject Sentry
if (SENTRY.DSN) {
  Sentry.init({
    dsn: SENTRY.DSN,
    environment: SENTRY.ENV,
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
if (SENTRY.DSN) {
  app.use(Sentry.Handlers.requestHandler());
}

// Sentry: Inject Tracing Handler
if (SENTRY.DSN) {
  app.use(Sentry.Handlers.tracingHandler());
}

// Inject Plugins
app.use(json());

// Inject Routers
app.use("/", rootRouter);

// Sentry: Inject Error Handler
if (SENTRY.DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Configure Mongoose
Mongoose.set({ strictQuery: true });

// Connect to Database
Mongoose.connect(DATABASE.CONNECTION_STRING).then(
  () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to database.`);

    // eslint-disable-next-line no-console
    console.log(`Sentry is ${SENTRY.DSN ? "enabled" : "disabled"}.`);

    // Port
    const port = process.env.PORT || 5001;

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
