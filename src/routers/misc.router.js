// Modules
import Express from "express";

// Controllers
import { pingCtrl } from "controllers/misc/ping.ctrl";

// Create Router
export const miscRouter = Express.Router({ strict: true });

// Routes
miscRouter.get("/ping", pingCtrl);
