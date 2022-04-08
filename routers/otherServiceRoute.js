import express from "express";
import { Auth } from "../middlewere/Auth";
// import AdditionalOption from "../models/BrandModel";
import OtherService from "../models/OtherServiceModel";
const otherServiceRoute = express.Router();

otherServiceRoute.get("/", Auth, async (req, res) => {
  try {
    const result = await OtherService.find().sort({ name: 1 });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
otherServiceRoute.get("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const packages = await AdditionalOption.findById(id).populate([
      { path: "brands", select: ["brandName"] },
      { path: "categorys" },
      {
        path: "additionalOptions",
        select: ["name", "field"],
      },
      { path: "otherService" },
    ]);

    res.json(packages);
  } catch (error) {
    res.json(error);
  }
});
otherServiceRoute.post("/", Auth, async (req, res) => {
  try {
      const result = await OtherService.create(req.fields);
      res.json(result);
  } catch (error) {
    res.json(error);
  }
});
otherServiceRoute.put("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.fields;
    const { detail } = req.fields;
    const { price } = req.fields;
    const { discount } = req.fields;
    const { discountStatus } = req.fields;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await OtherService.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          detail: detail,
          price: price,
          discount: discount,
          discountStatus: discountStatus,
          
        },
      },
      {
        upsert: true,
        returnDocument: "after", 
      }
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

otherServiceRoute.delete("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await OtherService.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default otherServiceRoute;
