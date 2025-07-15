import ShopModel from "../models/ShopModel.js";
import fs from 'fs';
import bcrypt from 'bcrypt';



// add shop data

const addShop = async (req,res) =>{

    let image_filename = `${req.file.filename}`;

    const {name,phoneNumber,address,password,category} = req.body;

     const salts = await bcrypt.genSalt(10)
     const hashedPasswords = await bcrypt.hash(password,salts)

    const shop = new ShopModel({
        name:name,
        phoneNumber:phoneNumber,
        address:address,
        image:image_filename,
        category:category,
        password:hashedPasswords,
    })
    try{
       await shop.save();
       res.json({success:true,message:"Shop Added"})
    }catch(error){
         console.log(error);
         res.json({success:false,message:"Error"})
    }
}

// all Shop list
const listShop = async (req,res)=>{
    try{
      const shops = await ShopModel.find({});
      res.json({success:true,data:shops})
    }catch(error){
         console.log(error);
         res.json({success:false,message:"Error"})
    }
}

// remove shop 
const removeShop = async (req,res)=>{

    try{
       const shop = await ShopModel.findById(req.body.id);
       fs.unlink(`uploads/${shop.image}`,()=>{})

       await ShopModel.findByIdAndDelete(req.body.id);
       res.json({success:true,message:"shop is removed"})
    }catch(error){
             console.log(error);
             res.json({success:false,message:"Error"})
    }

}

export {addShop,listShop,removeShop};