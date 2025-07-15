import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ShopModel",
        required:true,
    }
});

const Item = mongoose.model("Item",ItemSchema);

export default Item;