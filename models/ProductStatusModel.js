import mongoose from "mongoose";
const productStatusSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProductStatus = mongoose.model("ProductStatus", productStatusSchema);
export default ProductStatus;
