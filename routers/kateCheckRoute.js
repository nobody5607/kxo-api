import express from "express";
import { Auth } from "../middlewere/Auth.js";
import Brand from "../models/BrandModel.js";
import Category from "../models/CategoryModel.js";
import Order from "../models/OrderModel.js";
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
    const brand = await Brand.findOne({ _id: id });
    const categorys = await Category.find({}).sort({ categoryName: 1 });
    const output = { brand, categorys };
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
      data["productImages"] = productImages;
      const resultOrder = await Order.create(data);
      res.json(data);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }

    // let orderData = {
    //   userID: req.user.id,
    //   brand: "623c79e95e447cb020b2f39e",
    //   orderItems: [
    //     {
    //       name: "แบรนด์ CHANEL",
    //       qty: 1,
    //       price: 4500,
    //     },
    //     {
    //       name: "MAILED AUTHENTICITY CARD บริการออกใบรับรองโดย ENTRUPHY",
    //       qty: 1,
    //       price: 500,
    //     },
    //     {
    //       name: "SPA บริการทำสปากระเป๋า",
    //       qty: 1,
    //       price: 3000,
    //     },
    //   ],
    // "productImages": [
    //   {"name": "xxx.jpg","number":1}
    // ],
    //   paymentMethod: "ATM",
    //   paymentResult: {
    //     resultCode: "",
    //     amount: "",
    //     referenceNo: "",
    //     gbpReferenceNo: "",
    //     statusText: "",
    //     imageSlip: "",
    //     imageSlip: "",
    //   },
    //   totalPrice: 10000.5,
    // };
    // console.log(JSON.stringify(orderData));
    // const resultOrder = await Order.create(orderData);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

export default kateCheckRoute;
