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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    model: {
      type: String,
      required: true,
    },
    additionalOptions: [
      {
        field: { type: String },
        name: { type: String },
        value: { type: String },
      },
    ],
    productImages: [
      {
        name: { type: String, required: true },
        path: { type: String, required: true },
        number: { type: Number, required: true },
      },
    ],
    orderItems: [
      {
        name: { type: String, required: true },
        detail: { type: String },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        discountStatus: { type: Boolean },
      },
    ],
    coupon: {
      couponCode: { type: String },
      discount: { type: Number },
    },
    vat: { type: Number },
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
    price: {
      type: Number, //price
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number, //price - coupone + vat
      required: true,
      default: 0.0,
    },
    productStatus: {
      type: mongoose.Schema.Types.ObjectId, //สถานะการตรวจสอบสินค้า
      required: true,
      ref: "ProductStatus",
    },
    orderStatus: {
      type: mongoose.Schema.Types.ObjectId, //สถานะการจ่ายเงิน
      required: true,
      ref: "OrderStatus",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
