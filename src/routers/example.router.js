// Modules
import Express from "express";

// Controllers
import ExampleCtrl from "controllers/example/example.ctrl";

// Create Router
const exampleRouter = Express.Router({ strict: true });

// Routes
exampleRouter.get("/hello", ExampleCtrl);

// Exports
export default exampleRouter;
