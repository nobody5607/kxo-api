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
    const packageData = {
      name: "CELINE",
      brand: [
        "623c79e95e447cb020b2f39d",
        "623c79e95e447cb020b2f39e",
        "623c79e95e447cb020b2f3a0",
      ],

      additionalOptions: [
        "623e975ca99b7a62d47bbd40",
        "623e975ca99b7a62d47bbd41",
        "623e975ca99b7a62d47bbd42",
      ],
      otherService: ["623e9b80aef625f4839ec4c4", "623e9b80aef625f4839ec4c5"],
      image: {
        path: "http://localhost:3000/uploads/images/celine.png",
        name: "celine.png",
      },
      price: 1500,
      discount: 1390,
      status: "draft",
      discountStatus: false,
    };
    const result = await Package.insertMany(packageData);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default categoryRoute;
