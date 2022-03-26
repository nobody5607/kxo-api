import mongoose from "mongoose";
const packageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    brand: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],

    additionalOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Additional",
      },
    ],
    otherService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OtherService",
      },
    ],
    image: {
      path: { type: String },
      name: { type: String },
    },
    price: { type: Number },
    discount: { type: Number },
    status: {
      type: String,
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
const Package = mongoose.model("Package", packageSchema);
export default Package;
