import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import User from "../models/UserModel";
import { uploadImage } from "../utils/utils";
import moment from "moment";
const orderRoute = express.Router();
orderRoute.get("/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    let order = await Order.findById(id);
    let output = [];
    if (order) {
      output = order;
      let userObj = {};
      let user = await User.findOne({ userID: order.userID });
      if (user) {
        userObj = {
          userID: user.userID,
          name: user.name,
          email: user.email,
          phone: user.phone,
        };
        output["user"] = userObj;
      }
      res.json(output);
    } else {
      res.json({ message: "Not found order!" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
orderRoute.post("/", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    let productImages = [];
    if (data) {
      data = JSON.parse(data);
      //check file name
      if (Object.keys(req.files).length == 0) {
        return res.json({
          status: "nok",
          message: "กรุณาเลือกไฟล์",
        });
      }
      //upload images
      let number = 1;
      for (let i in req.files) {
        let result = await uploadImage({ file: req.files[i] });
        productImages.push({
          name: result,
          number: number,
          path: `${process.env.IMAGE_URL}/uploads/images/${result}`,
        });
        number++;
      }
      //end upload images
      data["userID"] = req.user.id;
      data["productImages"] = productImages;
      const resultOrder = await Order.create(data);
      res.json(resultOrder);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

orderRoute.post("/upload-slip", Auth, async (req, res) => {
  try {
    let { data } = req.fields;

    let productImages = "";
    if (data) {
      data = JSON.parse(data);
      if (Object.keys(req.files).length == 0) {
        return res.json({
          status: "nok",
          message: "กรุณาเลือกไฟล์",
        });
      }
      //upload images

      for (let i in req.files) {
        let result = await uploadImage({ file: req.files[i] });
        productImages = `${process.env.IMAGE_URL}/uploads/images/${result}`;
      }
      //get order
      let paymentResult = {
        amount: data.amount,
        gbpReferenceNo: "",
        imageSlip: productImages,
        referenceNo: "",
        resultCode: "",
        statusText: "",
        dateSlip: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const order = await Order.findOneAndUpdate(
        { _id: data.orderID },
        {
          $set: {
            orderStatus: "624b103b6d5d658a1f341e1a", //อัปโหลดสลิปแล้ว
            paymentResult: paymentResult,
          },
        },
        {
          upsert: true,
          returnDocument: "after", // this is new !
        }
      );
      res.json(order);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
export default orderRoute;
