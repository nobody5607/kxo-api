import express from "express";
import fs from "fs";
const importRoute = express.Router();
import Brand from "../models/BrandModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
//import brand
importRoute.get("/brand", async (req, res) => {
  fs.readFile("./brand.json", "utf8", async function (err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);
    let brandObj = [];
    for (let i of obj["RECORDS"]) {
      brandObj.push({
        brandName: i.brand_name,
        slug: i.slug,
      });
    }
    await Brand.insertMany(brandObj);
    res.send(brandObj);
  });
});
//category
importRoute.get("/category", async (req, res) => {
  fs.readFile("./category.json", "utf8", async function (err, data) {
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
  fs.readFile("./users.json", "utf8", async function (err, data) {
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
export default importRoute;
