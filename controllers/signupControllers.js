import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email: email }).exec();      //findOne will check the db with the email provided

    if (existUser) return res.status(400).send({ message: "Email already exists" })

    const salt = await bcrypt.genSalt(10);                          //generating 10 random strings
    const hashedPassword = await bcrypt.hash(password, salt)        //Hashing the password with the salt

    const user = new User({                         //schema to add data to respective collection
        name: name,
        email: email,
        password: hashedPassword
    })
    try {
        var response = await user.save();           //saving the data to respective collection
        res.send({ message: "Successfully Registered!" })
    }
    catch (err) {
        res.send(err);
    }
}