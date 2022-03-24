import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    productImages: [
      {
        name: { type: String, required: true },
        path: { type: String, required: true },
        number: { type: Number, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      default: "ATM", //atm,credit,prompay
    },
    paymentResult: {
      resultCode: { type: String },
      amount: { type: String },
      referenceNo: { type: String },
      gbpReferenceNo: { type: String },
      statusText: { type: String },
      imageSlip: { type: String },
      dateSlip: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
