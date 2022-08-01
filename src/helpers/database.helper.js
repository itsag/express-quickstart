// Modules
import Mongoose from "mongoose";

// Common
import { DATABASE } from "common/constants";

// Connect
export const connect = async () => {
  return await Mongoose.connect(DATABASE.CONNECTION_STRING);
};

// Exports
export default {
  connect,
};
