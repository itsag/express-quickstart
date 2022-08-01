// Modules
import Cors from "cors";

// Common
import { CORS } from "common/constants";

// Enable Cors
export const enableCors = (app) => {
  app.use(
    Cors({
      origin: JSON.parse(CORS.WHITELIST),
    })
  );
};

// Exports
export default {
  enableCors,
};
