
const User = require('../models/User');
const Product=require("../models/Product")
const Cart=require("../models/Cart")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js');

const router = require('express').Router();

//CREATE CART
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const userId = req.body.userId;
    // console.log(userId);
    // console.log(req.body.products[0]);
    try {
        // Check if the user already has a cart
        const existingCart = await Cart.findOne({ userId });
        // console.log(existingCart);
        if (existingCart) {
            // If the user already has a cart, update the existing cart
            existingCart.products.push(req.body.products[0]);
            const updatedCart = await existingCart.save();
            res.status(200).json(updatedCart);
        } else {
            // If the user doesn't have a cart, create a new cart for the user
            const newCart = new Cart(req.body);
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



// // UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
//DELETE
router.delete("/:cartId/:productId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Extract parameters from the request
        const { cartId, productId } = req.params;

        // Retrieve the cart document by its ID
        const cart = await Cart.findById(cartId);

        // Check if the cart document exists
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Find the index of the product with the specified productId
        const index = cart.products.findIndex(product => product.productId === productId);

        // Check if the product exists in the array
        if (index === -1) {
            return res.status(404).json({ error: "Product not found in the cart" });
        }

        // Remove the product from the products array at the found index
        cart.products.splice(index, 1);

        // Save the updated cart document
        await cart.save();

        // Return a success response
        res.status(200).json({ message: "Product has been removed"});
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

 //GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userId});
        
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//  //GET ALL 
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }
    catch(err){
        res.status(500).json(err);
    }
})
router.get("/",verifyTokenAndAdmin , async(req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;