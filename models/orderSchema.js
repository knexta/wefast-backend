import mongoose from "mongoose";

const orderSchema = mongoose.Schema;

const schema = new orderSchema({

    pick_up_address: {
        type: String,
        required: true
    },
    pick_up_mobile_no: {
        type: Number,
        required: true,
        unique:true
    },
    contact_person: {
        type: String,
        
    },
    your_order_no: {
        type: Number,
        
    },
    buying_option:{
        
    
    },
    delivery_address: {
        type: String,
        required: true
    },
    delivery_mobile_no: {
        type: Number,
        required: true,
        unique:true
    },
    delivery_contact_person: {
        type: String,
        
    },
   
    delivery_option:{
        type:String,
    
    },
    
}, { timestamps: true })

 const Order = mongoose.model('Order', schema)
 export default Order ;