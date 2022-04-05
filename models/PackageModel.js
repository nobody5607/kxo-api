import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const packageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    brands: [
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
    categorys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    model: {
      type: String,
      required: true,
    },
    discount: { type: Number },
    price: { type: Number },
    discountStatus: { type: Boolean },
    status: {
      type: String,
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
packageSchema.plugin(mongoosePaginate);
const Package = mongoose.model("Package", packageSchema);
export default Package;
