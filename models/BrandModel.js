import mongoose from "mongoose";
const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    status: {
      type: Number 
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
