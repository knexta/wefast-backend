import  User  from "../models/userSchema.js";
import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();


router.route('/').post(async (req, res) => {
    // const { email,password } = req.body;
    const { password,user_type,phone,email } = req.body;

if(user_type){
    if(user_type!="individuals" && user_type!="business"){
        return res.status(400).send({ message: "user_type is invalid" })
    }
}
else{
    return res.status(400).send({ message: "user_type is mandtory" })
}

    if(user_type=="individuals")
    {
        if(!phone){
            return res.status(400).send({ message: "phone number is mandtory" })
        }
        if(!password){
            return res.status(400).send({ message: "password  is mandatory" })
        }

    }

    if(user_type=="business")
    {
        if(!email){
            return res.status(400).send({ message: "email number is mandtory" })
        }
        if(!password){
            return res.status(400).send({ message: "password number is mandatory" })
        }

    }
   
    var existUser;
  
    if(user_type=="individuals"){
    var findPhone = await User.findOne({ phone: phone });

    if(findPhone){
     existUser = findPhone;
    }
    else{
        return res.status(400).send({ message: "phone number is invalid" })
    }
    }
    

    if(user_type=="business"){
    var findEmail = await User.findOne({ email: email });
    if(findEmail){
    existUser = findEmail;
    }
    else{
        return res.status(400).send({ message: "Email is invalid" })
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