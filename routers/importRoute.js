import express from "express";
import fs from "fs";
const importRoute = express.Router();
import Brand from "../models/BrandModel";
import Category from "../models/CategoryModel";
import User from "../models/UserModel";
import Item from "../models/ItemModel";
import Package from "../models/PackageModel";
import AdditionalOption from "../models/AdditionalOptionModel";
import OtherService from "../models/OtherServiceModel";
import OrderStatus from "../models/OrderStatusModel";
import ProductStatus from "../models/ProductStatusModel";

//import brand
importRoute.get("/brand", async (req, res) => {
  fs.readFile("./data/brand.json", "utf8", async function (err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);
    let brandObj = [];
    for (let i of obj["RECORDS"]) {
      brandObj.push({
        brandName: i.brand_name,
        slug: i.slug,
        discount: 0,
        price: 0,
      });
    }
    await Brand.insertMany(brandObj);
    res.send(brandObj);
  });
});

//import item
importRoute.get("/item", async (req, res) => {
  fs.readFile("./data/item.json", "utf8", async function (err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);
    let dataObj = [];
    for (let i of obj["RECORDS"]) {
      dataObj.push({
        name: i.name,
        detail: i.detail,
        price: i.price,
        discount: i.discount,
      });
    }
    await Item.insertMany(dataObj);
    res.send(dataObj);
  });
});
//category
importRoute.get("/category", async (req, res) => {
  fs.readFile("./data/category.json", "utf8", async function (err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);
    let cateObj = [];
    for (let i of obj["RECORDS"]) {
      cateObj.push({
        categoryName: i.cate_name,
        slug: i.slug,
      });
    }
    await Category.insertMany(cateObj);
    res.send(cateObj);
  });
});

//user
importRoute.get("/user", async (req, res) => {
  fs.readFile("./data/users.json", "utf8", async function (err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);
    let cateObj = [];
    for (let i of obj["RECORDS"]) {
      cateObj.push({
        userID: i.id,
        name: `${i.firstname} ${i.lastname}`,
        email: i.email,
        password: i.password,
        permission: i.permission ? i.permission : "customer",
        level: i.kxo_user_level ? parseInt(i.kxo_user_level) : 0,
        phone: i.phone,
      });
    }
    await User.insertMany(cateObj);
    res.send(cateObj);
  });
});

//package
importRoute.get("/package", async (req, res) => {
  const packageData = {
    name: "hermes",
    brand: [
      "623c79e95e447cb020b2f39d",
      "623c79e95e447cb020b2f39e",
      "623c79e95e447cb020b2f3a0",
    ],
    image: "",
    price: 4500,
    discount: 3900,
  };
  const packages = new Package(packageData);
  const result = await packages.save();
  res.send(result);
});
//additional
importRoute.get("/additional", async (req, res) => {
  const data = [
    { name: "Add Serial Number" },
    { name: "Add a Note" },
    { name: "Add Web Link" },
  ];
  const result = await AdditionalOption.insertMany(data);
  res.send(result);
});
//additional
importRoute.get("/other-service", async (req, res) => {
  const data = [
    {
      name: "MAILED AUTHENTICITY CARD",
      detail: "บริการออกใบรับรองโดย ENTRUPHY",
      price: 1000,
      discount: 500,
      discountStatus: true,
    },
    {
      name: "SPA",
      detail: "บริการทำสปากระเป๋า",
      price: 4500,
      discount: 3000,
      discountStatus: true,
    },
  ];
  const result = await OtherService.insertMany(data);
  res.send(result);
});

importRoute.get("/order-status", async (req, res) => {
  const data = [
    {
      name: "รอชำระเงิน",
    },
    {
      name: "ชำระเงินแล้ว",
    },
    {
      name: "ยกเลิก",
    },
  ];
  const result = await OrderStatus.insertMany(data);
  res.send(result);
});

importRoute.get("/product-status", async (req, res) => {
  const data = [
    {
      name: "รอตรวจสอบ",
    },
    {
      name: "ผ่าน",
    },
    {
      name: "ไม่ผ่าน",
    },
  ];
  const result = await ProductStatus.insertMany(data);
  res.send(result);
});
export default importRoute;
