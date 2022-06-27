import express from "express";
import { Auth } from "../middlewere/Auth";
import Package from "../models/PackageModel";
import { uploadImage } from "../utils/utils";
const packageRoute = express.Router();
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

packageRoute.get("/", async (req, res) => {
  try {
    const { page, size, title, backend, status } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      //sort: { date: -1 },
      populate: [
        { path: "brands", select: ["brandName"] },
        { path: "categorys", select: ["categoryName"] },
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
    let condition = {};

    if (status) {
      if (status != "" && status != "all") {
        condition = { status: status };
      }
    }

    if (!backend) {
      condition = { status: "publish" };
    }

    const packages = await Package.paginate(condition, options);
    // const packagesAll = await Package.find({});
    const outputCount = [];
    let countPackagesAll = await Package.countDocuments({});
    outputCount.push({ id: "all", name: "ทั้งหมด", count: countPackagesAll });
    let countPublish = await Package.countDocuments({ status: "publish" })
    outputCount.push({ id: "publish", name: "publish", count: countPublish });
    let countdarft = await Package.countDocuments({ status: "darft" })
    outputCount.push({ id: "darft", name: "darft", count: countdarft });
    let countdelete = await Package.countDocuments({ status: "delete" })
    outputCount.push({ id: "delete", name: "delete", count: countdelete });
    console.log(outputCount);
    res.json({
      data: packages.docs,
      countData: backend ? outputCount : [],
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
packageRoute.post("/", Auth, async (req, res) => {
  try {
    let { data, id } = req.fields;

    if (data) {
      data = JSON.parse(data);
      let productImages = "";

      if (Object.keys(req.files).length > 0) {
        for (let i in req.files) {
          let result = await uploadImage({ file: req.files[i] });
          productImages = `${process.env.IMAGE_URL}/uploads/images/${result}`;
        }
        data["image"] = {
          path: productImages,
          name: productImages,
        };
      }
      if (id) {
        //update

        const result = await Package.findOneAndUpdate(
          { _id: id },
          {
            $set: data,
          },
          {
            upsert: true,
            returnDocument: "after", // this is new !
          }
        );
      } else {
        let createBy = {
          id: req.user.id,
          name: `${req.user.firstname} ${req.user.lastname}`,
          email: req.user.email,
        };
        data["createBy"] = createBy;
        const result = await Package.insertMany(data);
      }

      return res.json(result);
    }
    return res.json({ msg: "not found data" });
  } catch (error) {
    return res.json(error);
  }
});

packageRoute.delete("/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    const result = await Package.findOneAndUpdate(
      { _id: id },
      {
        $set: { status: "delete" },
      },
      {
        upsert: true,
        returnDocument: "after", // this is new !
      }
    );

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});
export default packageRoute;
