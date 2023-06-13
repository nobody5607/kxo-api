import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import User from "../models/UserModel";
import { uploadImage } from "../utils/utils";
import moment from "moment";
import OrderStatus from "../models/OrderStatusModel";
const orderRoute = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

orderRoute.get("/", Auth, async (req, res) => {
  try {
    const { page, size, backend, order_status } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      populate: [
        { path: "brand", select: ["brandName"] },
        { path: "category", select: ["categoryName"] },
        { path: "orderStatus", select: ["name"] },
        { path: "productStatus", select: ["name"] },
        { path: "package" },
      ],
      lean: true,
      offset: offset,
      limit: limit,
      sort: { _id: -1 },
    };
    let condition = {};
    if (order_status) {
      if (order_status != "all") {
        condition = { orderStatus: order_status };
      }
    }
    const orders = await Order.paginate(condition, options);
    const orderStatus = await OrderStatus.find({});
    const outputCount = [];
    let countOrderAll = await Order.countDocuments({});
    outputCount.push({ id: "all", name: "ทั้งหมด", count: countOrderAll });
    for (let i of orderStatus) {
      let countOrder = await Order.countDocuments({ orderStatus: i._id });
      outputCount.push({ id: i._id, name: i.name, count: countOrder });
    }
    res.json({
      data: orders.docs,
      countData: backend ? outputCount : [],
      total: orders.totalDocs,
      totalPages: orders.totalPages,
      currentPage: orders.page,
    });
  } catch (error) {
    res.json(error);
  }
});

orderRoute.get("/:id", Auth, async (req, res) => {
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
orderRoute.post("/", Auth, async (req, res) => {
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
      //upload images
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
      let createBy = {
        id: req.user.id,
        name: `${req.user.firstname} ${req.user.lastname}`,
        email: req.user.email,
        phone: req.user.phone,
      };
      data["user"] = createBy;
      data["productImages"] = productImages;
      const resultOrder = await Order.create(data);
      res.json(resultOrder);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

orderRoute.post("/upload-slip", Auth, async (req, res) => {
  try {
    let { data } = req.fields;

    let productImages = "";
    if (data) {
      data = JSON.parse(data);
      if (Object.keys(req.files).length == 0) {
        return res.json({
          status: "nok",
          message: "กรุณาเลือกไฟล์",
        });
      }
      //upload images

      for (let i in req.files) {
        let result = await uploadImage({ file: req.files[i] });
        productImages = `${process.env.IMAGE_URL}/uploads/images/${result}`;
      }
      //get order
      let paymentResult = {
        amount: data.amount,
        gbpReferenceNo: "",
        imageSlip: productImages,
        referenceNo: "",
        resultCode: "",
        statusText: "",
        dateSlip: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const order = await Order.findOneAndUpdate(
        { _id: data.orderID },
        {
          $set: {
            orderStatus: "624b103b6d5d658a1f341e1a", //อัปโหลดสลิปแล้ว
            paymentResult: paymentResult,
          },
        },
        {
          upsert: true,
          returnDocument: "after", // this is new !
        }
      );
      res.json(order);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
orderRoute.put("/update-status/:id", Auth, async (req, res) => {
  try {
    let { orderStatus } = req.fields;
    let { id } = req.params;
    if (!id) {
      return res.json({ message: "ไม่พบข้อมูล" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          orderStatus: orderStatus,
        },
      },
      {
        upsert: true,
        returnDocument: "after", // this is new !
      }
    );
    res.json(order);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
export default orderRoute;
