import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userAddressSchema = mongoose.Schema(
  {
    user: {
      user_id: { type: String },
      user_name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    userAddress: {
      amphure: {
        AMPHUR_ID: { type: Number },
        AMPHUR_NAME: { type: String },
      },
      district: {
        DISTRICT_ID: { type: String },
        DISTRICT_NAME: { type: String },
      },
      province: {
        PROVINCE_ID: { type: Number },
        PROVINCE_NAME: { type: String },
      },
      your_address: { type: String },
      zip_code: { type: String },
    },
    addressDefault: {
      addressShipping: { type: Number },
      addressOrderDefault: { type: String },
      addressKatecheckDefault: { type: String },
      addressSellWithUsDefault: { type: String },
      addressReturnProductDefault: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
userAddressSchema.plugin(mongoosePaginate);
const UserAddress = mongoose.model("UserAddress", userAddressSchema);

export default UserAddress;
