import express from "express";
import { Auth } from "../middlewere/Auth";
import UserAddress from "../models/UserAddressModel";

const userAddressRoute = express.Router();

userAddressRoute.get("/", Auth, async (req, res) => {
  try {
    const result = await UserAddress.find().sort({ user_id: 1 });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

userAddressRoute.get("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;

    // let userAddress = await UserAddress.find();
    const result = await UserAddress.find({ 'user.user_id': id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

userAddressRoute.post("/", async (req, res) => {
  try {
    let { data } = req.fields;
    data = JSON.parse(data);
    const result = await UserAddress.create(data);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default userAddressRoute;
