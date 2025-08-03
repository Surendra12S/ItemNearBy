import express from "express";
import { addShop, listShop, removeShop } from "../controllers/ShopController.js";
import multer from "multer";
import { storage } from "../controllers/cloudinaryConfig.js"; // ✅ Cloudinary config
import ShopModel from "../models/ShopModel.js";
import bcrypt from "bcrypt";


const upload = multer({ storage });

const ShopRouter = express.Router();

ShopRouter.post("/add", upload.single("image"), addShop);

ShopRouter.get("/list", listShop);

ShopRouter.post("/remove", removeShop);

ShopRouter.post("/ownerLogin", async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  try {
    const shop = await ShopModel.findOne({ name, phoneNumber });
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      _id: shop._id,
      image: shop.image,
      name: shop.name,
      phoneNumber: shop.phoneNumber,
      address: shop.address,
      category: shop.category,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default ShopRouter;
