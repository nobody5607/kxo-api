import express from "express";
import { Auth } from "../middlewere/Auth";
import Category from "../models/CategoryModel";
const categoryRoute = express.Router();

categoryRoute.get("/", Auth, async (req, res) => {
  try {
    const result = await Category.find().sort({ categoryName: 1 });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
categoryRoute.get("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const packages = await Package.findById(id).populate([
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
categoryRoute.post("/", Auth, async (req, res) => {
  try {
    const result = await Category.create(req.fields);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
categoryRoute.put("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.fields;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await Category.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          categoryName: categoryName, //อัปโหลดสลิปแล้ว
        },
      },
      {
        upsert: true,
        returnDocument: "after", // this is new !
      }
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
categoryRoute.delete("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await Category.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default categoryRoute;
