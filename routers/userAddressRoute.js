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
    const result = await UserAddress.findOne({ "user.user_id": id });
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

userAddressRoute.get("/delete-address/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    const result = await UserAddress.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    res.json(error);
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
      { _id: id },
      {
        $set: data,
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

userAddressRoute.put("/activete-address/:id", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    data = JSON.parse(data);
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    // await UserAddress.updateMany(
    //   { user_id: data.user_id },
    //   {
    //     $set: { "addressShipping": null },
    //   },
    //   {
    //     upsert: true,
    //     returnDocument: "after", // this is new !
    //   }
    // );

    const result = await UserAddress.findOneAndUpdate(
      { _id: id },
      {
        $set: { "addressShipping": data._id },
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
    //updateOne({ _id: 1, grades: 80 }, { $set: { "grades.$": 82 } });
    res.json({ status: 'ok', message: 'insert data success' });
  } catch (error) {
    res.json(error);
  }
});

export default userAddressRoute;
