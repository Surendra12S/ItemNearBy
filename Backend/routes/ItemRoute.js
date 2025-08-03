import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Item from "../models/ItemModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "item_images",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage });

// Route to add item
router.post("/add-item", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, shopId } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const imageUrl = req.file.path;

    const newItem = new Item({
      name,
      price,
      description,
      category,
      image: imageUrl,
      shopId,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Get items for a shop
router.get("/get-items/:shopId", async (req, res) => {
  try {
    const { shopId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({ error: "Invalid shop ID" });
    }

    const objectId = new mongoose.Types.ObjectId(shopId);
    const items = await Item.find({ shopId: objectId });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Search items by name
router.get("/search-items", async (req, res) => {
  const query = req.query.query || "";

  try {
    const results = await Item.find({
      name: { $regex: query, $options: "i" },
    }).populate("shopId", "name");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
