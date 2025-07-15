import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: {type:String,require:true},
    phoneNumber:{type:String,require:true},
    address:{type:String,require:true},
    image:{type:String,require:true},
    category:{type:String,require:true},
    password:{type:String,require:true}
})

const ShopModel = mongoose.model.ShopModel || mongoose.model("ShopModel",ShopSchema)

export default ShopModel;