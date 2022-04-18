import express from "express";
import { Auth } from "../middlewere/Auth";
import Brand from "../models/BrandModel";
const brandRoute = express.Router();

brandRoute.get("/", Auth, async (req, res) => {
  try {
    const result = await Brand.find().sort({ brandName: 1 });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
brandRoute.get("/:id", Auth, async (req, res) => {
  try {
    let id = req.params.id;
    const result = await Brand.findById(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
brandRoute.post("/", Auth, async (req, res) => {
  try {
    const result = await Brand.create(req.fields);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

//update or update status
brandRoute.put("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName } = req.fields;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await Brand.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          brandName: brandName, //อัปโหลดสลิปแล้ว
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

brandRoute.delete("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.send("ไม่พบข้อมูล");
    }
    const result = await Brand.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default brandRoute;
