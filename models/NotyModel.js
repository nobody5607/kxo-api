import mongoose from "mongoose";
const notySchema = mongoose.Schema(
  {
    target: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Noty = mongoose.model("Notification", notySchema);
export default Noty;
