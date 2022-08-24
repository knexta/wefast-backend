import express from "express";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import twilio from 'twilio';
import  User  from "../models/userSchema.js";


const router = express.Router();
const CLIENT_URL = "http://localhost:3000"


router.route('/').put(async (req, res) => {
    const { email,user_type,phone} = req.body;
    var existUser;

    if(user_type){
        if(user_type=="individuals"){
            existUser= await User.findOne({phone : phone})
            if (!existUser) {                                         
                return res.status(400).send({ message: "User with this phone number doesn't exists." })
            }
        }
    }else{
        return res.status(400).send({ message: "user_type is mandatory..." })
    }

if(user_type=="business"){
    //get the email from db
    existUser = await User.findOne({ email: email }) 

    //If email does not exists
    if (!existUser) {                                         
        return res.status(400).send({ message: "User with this email doesn't exists." })
    }
}
    

    // If email is exists create a token
    const token = jwt.sign({ _id: existUser._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })


    if(user_type=="business"){
    //sending email to reset password
    sgMail.setApiKey(process.env.API_KEY)          
    const msg = {
        to: email,
        from: {
            name: "sendMail",
            email: process.env.ACCOUNT_EMAIL
        },
        subject: "Your New Password Resetting Link",
        html: `<h2>Please click on given link to reset your password</h2>
            <p>${CLIENT_URL}/reset-password/${token}</p>`
    }

    try {
        await User.updateOne({ email: email }, { $set: { resetLink: token } })      //update the token in db
        return sgMail
            .send(msg)
            .then(() => {
                return res.send({ message: "Email has been sent!" })        //mail will send only if the token is valid
            })
            .catch((error) => {
                return res.send({ message: error })
            })

    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}

if(user_type=="individuals"){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_SERVICE_SID;
        const client = twilio(accountSid, authToken)
        // let msg = {};
        try{
        await client.messages
            .create({
                // body: `Please enter the OTP to verify , here is your otp `,
                body: `Your New Password Resetting Link ${CLIENT_URL}/reset-password/${token}`,
                messagingServiceSid: serviceSid,
                // html :`<h2>Please click on given link to reset your password</h2>
                // <p>${CLIENT_URL}/reset-password/${token}</p>`,
                to: phone
                
            },(err,data)=>{
                if(err) {
                    return res.status(500).send({ message: err })
                }
                else {
                    return res.send({ message: "reset link has been sent!" })
                }
            })
        return msg;
        }catch(err){
            return {status:400,data:err}
        } 
}

});


export const forgotPasswordRouter = router;