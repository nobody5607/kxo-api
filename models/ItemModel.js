import mongoose from "mongoose";
const itemSchema = mongoose.Schema(
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
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
); 
const Item = mongoose.model("Item", itemSchema);
export default Item;
