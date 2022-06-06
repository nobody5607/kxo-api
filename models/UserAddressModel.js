import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userAddressSchema = mongoose.Schema(
  {
    user_id: { type: String },
    userAddress: [
      {
        user_name: { type: String },
        email: { type: String },
        phone: { type: String },
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
    ],
    addressShipping: { type: String },
    addressOrderDefault: { type: String },
    addressKatecheckDefault: { type: String },
    addressSellWithUsDefault: { type: String },
    addressReturnProductDefault: { type: String },
  },
  {
    timestamps: true,
  }
);

userAddressSchema.plugin(mongoosePaginate);
const UserAddress = mongoose.model("UserAddress", userAddressSchema);

export default UserAddress;
