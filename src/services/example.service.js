// Schemas
import ExampleModel from "services/models/example.model";

// Get Record
export const getRecord = async ({ id }) => {
  return await ExampleModel.findOne({ id });
};

// Exports
export default { getRecord };
