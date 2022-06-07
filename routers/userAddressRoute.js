import express from "express";
import { Auth } from "../middlewere/Auth";
import UserAddress from "../models/UserAddressModel";

const userAddressRoute = express.Router();

userAddressRoute.get("/", Auth, async (req, res) => {
  try {
    const result = await UserAddress.findOne({ "user.user_id": req.user.id });
    res.json({ status: 'ok', data: result });
  } catch (error) {
    res.json(error);
  }
});

userAddressRoute.get("/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      id = req.user.id;
    }
    const result = await UserAddress.findOne({ "user.user_id": req.user.id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

userAddressRoute.get("/edit-address/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    const result = await UserAddress.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

userAddressRoute.post("/delete-address", Auth, async (req, res) => {
  try {
    const { id, sub_id } = req.fields;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    const result = await UserAddress.findOneAndUpdate(
      { _id: id },
      {
        $pull: { userAddress: { _id: sub_id } }
      }
    );

    res.json({ status: 'ok', message: 'Delete Successfully!' });
  } catch (error) {
    res.json({ status: 'nok', message: error });
  }
});

userAddressRoute.put("/:id", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    data = JSON.parse(data);
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    const result = await UserAddress.findOneAndUpdate(
      { _id: id, "userAddress._id": data._id },
      {
        $set: { 'userAddress.$': data }
      }
    );

    res.json({ status: 'ok', message: 'Update Successfully!' });
  } catch (error) {
    res.json({ status: 'nok', message: error });
  }
});

userAddressRoute.put("/activete-address/:id", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    data = JSON.parse(data);
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    const result = await UserAddress.findOneAndUpdate(
      { _id: id },
      {
        $set: { "addressShipping": data._id },
      }
    );

    res.json({ status: 'ok', message: 'Update Successfully!' });
  } catch (error) {
    res.json({ status: 'nok', message: error });
  }
});

userAddressRoute.post("/", async (req, res) => {
  try {
    let { data } = req.fields;
    data = JSON.parse(data);

    const checkUser = await UserAddress.findOne({ user_id: data.user_id });
    if (checkUser) {
      //update data or update address
      await UserAddress.findOneAndUpdate({ user_id: data.user_id }, data);
    } else {
      //insert 
      await UserAddress.create(data);
    }

    res.json({ status: 'ok', message: 'Insert Data Successfully!' });
  } catch (error) {
    res.json({ status: 'nok', message: error });
  }
});

export default userAddressRoute;
