import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    additional_phone:{
        type: Number,
    
    },
    user_type:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:(false),
    },
    resetLink: {                            //resetLink will trigger only on forgot password request is processed.
        dataType: String,
        default: ''
    }
}, { timestamps: true })

 const User = mongoose.model('User', schema)
 export default User ;