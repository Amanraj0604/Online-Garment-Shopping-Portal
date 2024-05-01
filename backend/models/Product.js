const mongoose=require('mongoose');
const ProductSchmea=new mongoose.Schema(
    {
        title:{type:String, required:true},
        desc:{type:String, required:true},
        img:{type:String, required:true},
        categories:{type:Array},
        size:{type:Array, required:true},
        color:{type:String, required:true},
        price:{type:Number, required:true},
        inStock:{type:Boolean,default:true},
    },
    {timestamps:true},
);
module.exports=mongoose.model("Product",ProductSchmea);