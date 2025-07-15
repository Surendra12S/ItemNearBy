import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ShopRouter from "./routes/ShopRoute.js";
import userRouter from "./routes/userRoute.js";
import ItemRoute from "./routes/ItemRoute.js";
import dotenv from "dotenv";


dotenv.config();

//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
app.use(cors())


// db connection
connectDB();


// api endpoint
app.use("/api/shop",ShopRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
//api endpoint two
app.use("/uploads",express.static("uploads"));
app.use("/api/item",ItemRoute);




app.get('/',(req,res)=>{
 res.send("API Working");
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})


//mongodb+srv://dasarisurendra:5128480Surendra@cluster0.xdihynv.mongodb.net/

