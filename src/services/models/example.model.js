// Modules
import Mongoose from "mongoose";

// Schema
export const ExampleSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

// Exports
export default Mongoose.model("Example", ExampleSchema);
