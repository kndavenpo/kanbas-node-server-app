// Assignment A6 3.3

import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("users", schema);
export default model;

