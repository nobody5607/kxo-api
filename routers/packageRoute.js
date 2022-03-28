import express from "express";
import { Auth } from "../middlewere/Auth";
import Category from "../models/CategoryModel";
import Package from "../models/PackageModel";
const packageRoute = express.Router();
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
packageRoute.get("/", Auth, async (req, res) => {
  try {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      //sort: { date: -1 },
      populate: [
        { path: "brands", select: ["brandName"] },
        {
          path: "additionalOptions",
          select: ["name", "field"],
        },
        { path: "otherService" },
      ],
      lean: true,
      offset: offset,
      limit: limit,
    };

    const packages = await Package.paginate({}, options);

    res.json({
      data: packages.docs,
      total: packages.totalDocs,
      totalPages: packages.totalPages,
      currentPage: packages.page,
    });
  } catch (error) {
    res.json(error);
  }
});
packageRoute.get("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const packages = await Package.findById(id)
      .populate({
        path: "brands",
        select: ["brandName"],
      })
      .populate({
        path: "additionalOptions",
        select: ["name", "field"],
      })
      .populate("otherService");
    const categoryResult = await Category.find({});
    let categorys = [];
    for (let i of categoryResult) {
      categorys.push({ name: i.categoryName });
    }
    packages["categorys"] = categorys;
    res.json(packages);
  } catch (error) {
    res.json(error);
  }
});
packageRoute.post("/", Auth, async (req, res) => {
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
export default packageRoute;
