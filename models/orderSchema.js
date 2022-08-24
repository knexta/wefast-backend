import mongoose from "mongoose";

const orderSchema = mongoose.Schema;

const schema = new orderSchema({
    weight: {
        type: String,
        required: true
    },

    pickup_address: {
        type: String,
        required: true
    },
    pickup_mobile_no: {
        type: Number,
        required: true
        
    },
    pickup_landmark: {
        type: String,
        required: true,
        
    },
    pickup_contact_person: {
        type: String,
        
    },
    your_order_no: {
        type: Number,
        
    },
    buying_option:{
        type:String,
        
    
    },
    delivery_address: {
        type: String,
        required: true
    },
    delivery_mobile_no: {
        type: Number,
        required: true,
        
    },
    delivery_landmark: {
        type: String,
        required: true,
        
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