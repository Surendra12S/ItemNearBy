import express, { response } from "express"
import { addShop,listShop,removeShop } from "../controllers/ShopController.js"
import multer from "multer"
import ShopModel from "../models/ShopModel.js";
import bcrypt from "bcrypt";


const ShopRouter = express.Router();


// image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
      return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

ShopRouter.post("/add",upload.single("image"),addShop)
ShopRouter.get("/list",listShop)
ShopRouter.post("/remove",removeShop);
ShopRouter.post("/ownerLogin", async (req, res) => {
  const { name, phoneNumber, password } = req.body;
   


  try {
    const shop = await ShopModel.findOne({ name, phoneNumber });
     

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    res.status(200).json({
      _id:shop._id,
      image: shop.image,
      name: shop.name,
      phoneNumber: shop.phoneNumber,
      address: shop.address,
      category: shop.category,
    });

   

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



export default ShopRouter;
