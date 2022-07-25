import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async(req,res)=>{
    const { email, password } = req.body;
    var existUser = await User.findOne({ email: email }).exec();           //findOne will check the db with the email provided
    if (!existUser) return res.status(400).send({ message: "Email not registered" });

    try {
        if (await bcrypt.compare(password, existUser.password)) {           //run if current and existing password is matches
            const token = await jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, { expiresIn: "8h" });       //creating token with expiration
            res.status(200).send(token)
        }
        else {
            res.status(401).send({ message: "Invalid Credentials" })
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}