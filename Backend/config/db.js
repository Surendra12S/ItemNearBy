import mongoose from "mongoose";


export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://dasarisurendra:5128480Surendra@cluster0.xdihynv.mongodb.net/ItemNearBy').then(()=>{
        console.log("DB Connected");
    })
}