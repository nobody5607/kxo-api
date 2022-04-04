import mongoose from "mongoose";
const orderStatusSchema = mongoose.Schema(
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
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);
export default OrderStatus;
