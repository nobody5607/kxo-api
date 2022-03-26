import mongoose from "mongoose";
const otherServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    discountStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const OtherService = mongoose.model("OtherService", otherServiceSchema);
export default OtherService;
