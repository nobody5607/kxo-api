import mongoose from "mongoose";
const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      // unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
