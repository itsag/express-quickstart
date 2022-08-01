// Modules
import Express from "express";

// Child Routers
import ExampleRouter from "routers/example.router";

// Create Router
const rootRouter = Express.Router({ strict: true });

// Routes
rootRouter.use("/example", ExampleRouter);

// Exports
export default rootRouter;
