import  User  from "../models/userSchema.js";
import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();


router.route('/').post(async (req, res) => {
    // const { email,password } = req.body;
    const { password,user_type,phone,email } = req.body;
    // const existUser = await User.findOne({ email: email });   //to find the user
   
   
    var existUser;
  
    if(user_type=="individuals"){
    var findPhone = await User.findOne({ phone: phone });
    if(findPhone){
     existUser = findPhone;
    }
    else{
        return res.status(400).send({ message: "phone number is mandatory" })
    }
    }
    

    if(user_type=="business"){
    var findEmail = await User.findOne({ email: email });
    if(findEmail){
    existUser = findEmail;
    }
    else{
        return res.status(400).send({ message: "Email is mandatory" })
    }
    }

    if (!existUser) {
        return res.status(400).send({ message: "Cannot find user" })
    }

    try {
        if (await bcrypt.compare(password, existUser.password)) {
            const token = await jwt.sign({ existUser }, process.env.SECRET_KEY, { expiresIn: 3000 })       //creating token
            res.status(200).send({ message: "Success", token: token })
        }
        else {
            res.status(400).send({ message: "Invalid Credentials!" })
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

export const loginRouter = router;