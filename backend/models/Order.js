const mongoose=require('mongoose');
const Address=require("./Address")
const OrderSchema= new mongoose.Schema(
    {
        userId:{type:String,required:true},
        products:[
            {
                productId: { type: String, required: true },
                title: { type: String, required: true },
                img:{type:String},
                desc: { type: String, required: true },
                quantity: { type: Number, default: 1, min: 1 },
                size: { type: String, required: true },
                color: { type: String, required: true },
                price: { type: Number, required: true, min: 0 }
            },
        ],
        
        amount:{type:Number,required:true},
        address: { type: Address.schema, required: true }, 
        expectedDeliveryDate:{type:String},
        status:{type:String,default:"pending"},
        pay:{type:String},
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Order",OrderSchema);