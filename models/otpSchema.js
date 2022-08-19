import mongoose from "mongoose";

const otpSchema = mongoose.Schema;

const schema = new otpSchema({

   
    mobile_no: {
        type: Number,
        required: true,
        unique:true
    },
    
    
}, { timestamps: true })

 const OTP = mongoose.model('OTP', schema)
 export default OTP ;