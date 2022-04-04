import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import User from "../models/UserModel";
import moment from "moment";
const paymentRoute = express.Router();
paymentRoute.post("/", async (req, res) => {
  try {
    const { resultCode, amount, referenceNo, gbpReferenceNo, currencyCode } =
      req.fields;
    let statusText = "";
    if (resultCode == "00") {
      statusText = "ชำระเงินสำเร็จ";
    } else {
      statusText = "การชำระเงินล้มเหลว";
    }
    let paymentResult = {
      resultCode: resultCode,
      amount: amount,
      referenceNo: referenceNo,
      gbpReferenceNo: gbpReferenceNo,
      statusText: statusText,
      imageSlip: "",
      dateSlip: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };

    const order = await Order.findOneAndUpdate(
      { _id: referenceNo },
      {
        $set: {
          orderStatus: "62457a5e2f4aa4baa63d35a4",//ชำระเงินสำเร็จ
          paymentResult: paymentResult,
        },
      },
      {
        upsert: true,
        returnDocument: "after", // this is new !
      }
    );
    res.redirect(
      `${process.env.FRONTEND_URL}/step-check2/thankyou?ref_id=${referenceNo}`
    ); 
     
  } catch (error) {
    res.json(error);
  }
});
export default paymentRoute;
