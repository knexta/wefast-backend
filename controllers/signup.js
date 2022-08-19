import User from "../models/userSchema.js";
import OTP from "../models/otpSchema.js";
import bcrypt from "bcrypt";
import twilio from 'twilio';
import express from 'express';
const router = express.Router();

// 

router.route('/').post(async (req, res) => {
    try {
    const SEND_OTP = Math.floor(1000 + Math.random() * 9000);
    let user;
    const { name, email, password, phone, additional_phone, get_code, user_type, otp } = req.body;
    if (!user_type) return res.status(400).send({ message: "User type is Mandatory" });
    if (user_type != 'individuals' && user_type != 'business') return res.status(400).send({ message: "User type is Invalid" });
    if (!name) return res.status(400).send({ message: "Name is Mandatory" });
    if (!phone) return res.status(400).send({ message: "Phone is Mandatory" });

    if (user_type == "business") {
        if (!email) return res.status(400).send({ message: "Email is Mandatory" })
            if (!email.match(/^([A-Za-z0-9])+([_A-Za-z0-9- .]+)@([A-Za-z]+)\.([A-Za-z]{2,3})(.[A-Za-z]{2,3})?$/g)) {
                return res.status(400).send({ message: "Please enter a Valid mail address" })
            }
         user = await User.findOne({ email: email });
         if (user) return res.status(409).send({ message: "User with mail already exists" });
    }
 
    if (user_type == "individuals") {
        // generate otp and save it in db
        user = await User.findOne({ phone: phone });
        // return res.send({user})
        if (user) return res.status(409).send({ message: "User with phone no already exists" });
       // storing data in otp collection

        if(get_code){
            const otp_collection ={
                phone:phone,
                otp:SEND_OTP
            }
            const find = await OTP.findOne({phone:phone});
            if(find){
                return res.status(400).send("Phone number already exists");
            }else{
            await OTP.create(otp_collection);
            }
            let msg = await sendSMS(phone,SEND_OTP);
            console.log({msg})
            return res.status(msg.status).send(msg.data)
            
           
        }else{
            if(!otp) return res.status(400).send({ message: "OTP is mandatory" })
            if(!password) return res.status(400).send({ message: "Password is mandatory" })
            // validate otp
            const stored_data = await OTP.findOne({ phone: phone }); 
            console.log(stored_data);
            if(stored_data){
                if(stored_data.otp===otp)res.status(200).send({ message: "Account created successfully!" })
                else{
                   return res.status(400).send({ message: "Invalid OTP...." })
                }
            }

        }
    }


        // Password Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const data = {
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            additional_phone: additional_phone,
            user_type: user_type,
            isAdmin: false,
            resetLink: ""
        }
        await User.create(data);
      return res.status(200).send({ message: "Account created successfully!" })
    
    } catch (err) {
        console.log(err)
       return res.status(400).send({err})
    }

})

async function sendSMS(phone,SEND_OTP){
    
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
    const client = twilio(accountSid, authToken)
    let msg = {};
    try{
    await client.messages
        .create({
            // body: `Please enter the OTP to verify , here is your otp `,
            body: `Please enter the OTP to verify , here is your otp ${SEND_OTP}`,
            messagingServiceSid: serviceSid,
            to: phone
        },(err,data)=>{
            if(err) {
                msg.data = err;
                msg.status = 400;
            }
            else {
                msg.data = "OTP has been sent.......";
                msg.status = 200;
            }
        })
    return msg;
    }catch(err){
        return {status:400,data:err}
    }

}

export const signUpRouter = router;