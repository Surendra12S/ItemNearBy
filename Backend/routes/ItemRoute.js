import express from "express";
import multer from "multer";
import Item from "../models/ItemModel.js";
import mongoose from "mongoose";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function (req,file,cd){
        cd(null,Date.now()+file.originalname);
    },
});

const upload = multer({storage});

router.post("/add-item",upload.single("image"),async (req,res)=>{

  try{
    const {name,price,description,category,shopId} = req.body;
    console.log(res.body);
    
      if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const image = req.file.filename;

    const newItem = new Item({
        name,
        price,
        description,
        category,
        image,
        shopId,
    });
    
    await newItem.save();
    res.status(201).json({message:"Item added successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Failed to add item"});
  }

})

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

// Search items by name for a specific shop


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