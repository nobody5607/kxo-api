import express from "express";
import { Auth } from "../middlewere/Auth.js";
import Brand from "../models/BrandModel.js";
import Category from "../models/CategoryModel.js";
import Item from "../models/ItemModel.js";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import { uploadImage } from "../utils/utils.js";

const kateCheckRoute = express.Router();

kateCheckRoute.get("/brand", Auth, async (req, res) => {
  try {
    const brands = await Brand.find({
      slug: { $in: ["hermes", "chanel", "louis-vuitton", "celine"] },
    });
    res.json(brands);
  } catch (error) {
    res.json(error);
  }
});

kateCheckRoute.get("/select-brand/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    const categorys = await Category.find({}).sort({ categoryName: 1 });
    const items = await Item.find({}).sort({ id: -1 });
    const output = { brand, categorys, items };
    res.json(output);
  } catch (error) {
    res.json(error);
  }
});

kateCheckRoute.post("/order", Auth, async (req, res) => {
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
      data["userID"] = req.user.id;
      data["productImages"] = productImages;
      const resultOrder = await Order.create(data);
      res.json(resultOrder);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }

    // console.log(JSON.stringify(orderData));
    // const resultOrder = await Order.create(orderData);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
kateCheckRoute.get("/order/:id", Auth, async (req, res) => {
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
kateCheckRoute.post("/return-payment", async (req, res) => {
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
    // if (resultCode == "00") {
    //   res.redirect("https://katexoxo.com/thankyou?ref_id=" + referenceNo);
    // } else {
    //   res.redirect("https://katexoxo.com/other-payment?ref_id=" + referenceNo);
    // }

    // return res.json(order);
  } catch (error) {
    res.json({
      status: "nok",
      message: error.message,
      log: error,
    });
  }
});

export default kateCheckRoute;
