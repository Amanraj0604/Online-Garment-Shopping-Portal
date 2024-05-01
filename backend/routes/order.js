
const User = require('../models/User');
const Product=require("../models/Product")
const Order=require("../models/Order")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js');

const router = require('express').Router();

//CREATE order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// // UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been Removed");
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

 //GET USER Orders
router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId});
        
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//  //GET ALL 
router.get("/",verifyTokenAndAdmin , async(req,res)=>{
    try{
        const orders=await Order.find(); 
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;

//CANCEL ORDER
router.put("/cancel/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
      const canceledOrder = await Order.findByIdAndUpdate(req.params.id, {
          $set: { status: "Cancelled" } // Assuming you have a 'status' field in your Order model
      }, { new: true });
      res.status(200).json(canceledOrder);
  } catch (err) {
      res.status(500).json(err);
  }
});