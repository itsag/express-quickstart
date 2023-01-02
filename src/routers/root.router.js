// Modules
import Express from "express";

// Child Routers
import { miscRouter } from "routers/misc.router";

// Create Router
export const rootRouter = Express.Router({ strict: true });

// Routes
rootRouter.use("/misc", miscRouter);
