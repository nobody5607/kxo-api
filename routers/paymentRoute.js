import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import User from "../models/UserModel";
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
      dateSlip: "",
    };
    let order = await Order.findById(referenceNo);
    if (order) {
      order["paymentResult"] = paymentResult;
      const updatedOrder = await order.save();

      res.redirect(
        `${process.env.FRONTEND_URL}/step-check2/thankyou?ref_id=${referenceNo}`
      );
    } else {
      res.json({ message: "not found order" });
    }
    // return res.json(order);
  } catch (error) {
    res.json({
      status: "nok",
      message: error.message,
      log: error,
    });
  }
});
export default paymentRoute;
