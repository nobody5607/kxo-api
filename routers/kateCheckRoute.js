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

    
    // console.log(JSON.stringify(orderData));
    // const resultOrder = await Order.create(orderData);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

export default kateCheckRoute;
