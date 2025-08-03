import ShopModel from "../models/ShopModel.js";
import bcrypt from "bcrypt";


const addShop = async (req, res) => {
  const { name, phoneNumber, address, password, category } = req.body;

  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    const imageUrl = req.file.path; // ✅ Cloudinary returns full image URL
    
   

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const shop = new ShopModel({
      name,
      phoneNumber,
      address,
      image: imageUrl, // ✅ full Cloudinary URL
      category,         // ✅ added missing category
      password: hashedPassword,
    });

    await shop.save();
    res.json({ success: true, message: "Shop Added" });
  } catch (error) {
    console.error("Add Shop Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const listShop = async (req, res) => {
  try {
    const shops = await ShopModel.find({});
    res.json({ success: true, data: shops });
  } catch (error) {
    console.error("List Shop Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeShop = async (req, res) => {
  try {
    const shop = await ShopModel.findById(req.body.id);
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    await ShopModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Shop is removed" });
  } catch (error) {
    console.error("Remove Shop Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addShop, listShop, removeShop };
