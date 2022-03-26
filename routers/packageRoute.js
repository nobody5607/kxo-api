import express from "express";
import { Auth } from "../middlewere/Auth";
import Package from "../models/PackageModel";
const packageRoute = express.Router();

packageRoute.get("/", Auth, async (req, res) => {
  try {
    const packages = await Package.find({})
      .populate({
        path: "brand",
        select: ["brandName"],
      })
      .populate({
        path: "additionalOptions",
        select: ["name"],
      })
      .populate("otherService");
    res.json(packages);
  } catch (error) {
    res.json(error);
  }
});
packageRoute.post("/", Auth, async (req, res) => {
  try {
    const packageData = {
      name: "hermes",
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
        path: "",
        name: "",
      },
      price: 4500,
      discount: 3900,
      status: "draft",
    };
    const result = await Package.insertMany(packageData);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default packageRoute;
