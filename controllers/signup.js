import  User  from "../models/userSchema.js";
import bcrypt from "bcrypt";
import express from 'express';
const router = express.Router();

router.route('/').post(async (req, res) => {
    const { name, email, password ,phone, user_type} = req.body;

    const user = await User.findOne({ email: email });      //to find user

    if (user) {
        return res.status(409).send({ message: "User with email already exists" })
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const data = {
        name: name,
        email: email,
        password: hashedPassword,
        phone:phone,
        user_type:user_type,
        isAdmin: false,
        resetLink: ""
    }

    await User.create(data);
    res.send({ message: "Account created successfully!" })
})


export const signUpRouter = router;