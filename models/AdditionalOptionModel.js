import mongoose from "mongoose";
const additionalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const AdditionalOption = mongoose.model("Additional", additionalSchema);
export default AdditionalOption;
