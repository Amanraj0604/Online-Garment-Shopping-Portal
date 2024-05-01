const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const user=require("./routes/user");
const auth=require("./routes/auth");
const product=require("./routes/product");
const cart=require("./routes/cart");
const Order=require("./routes/order");
const stripe=require("./routes/strip");
const cors = require("cors");
const Address = require('./routes/address');
const Contact=require("./routes/contact")

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected")}
    )
.catch((err)=>{
    console.log("DB Connection error",err);
});

app.use("/shop/user",user);
app.use("/shop/auth",auth);
app.use("/shop/product",product);
app.use("/shop/cart",cart);
app.use("/shop/order",Order);
app.use("/shop/stripe",stripe);
app.use("/shop/address",Address);
app.use("/shop/contact",Contact);




app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running on port 5000");
});