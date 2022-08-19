import mongoose from "mongoose";

const otpSchema = mongoose.Schema;

const schema = new otpSchema({

   
    phone: {
        type: String,
        required: true
       
    },
    otp:{
        type: String,
        required: true
    },
    
    
}, { timestamps: true })

 const OTP = mongoose.model('OTP', schema)
 export default OTP ;