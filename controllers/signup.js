import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import express from 'express';
const router = express.Router();

router.route('/').post(async (req, res) => {
    const { name, email, password, phone, user_type } = req.body;
    if (!name) {
        return res.status(400).send({ message: "Name is Mandatory" })
    }
    if (!email) {
        return res.status(400).send({ message: "Email is Mandatory" })
    } else {
        if (!email.match(/^([A-Za-z0-9])+([_A-Za-z0-9- .]+)@([A-Za-z]+)\.([A-Za-z]{2,3})(.[A-Za-z]{2,3})?$/g)) {
            return res.status(400).send({ message: "Please enter a Valid mail address" })
        }
    }
    if (!password) {
        return res.status(400).send({ message: "Password is Mandatory" })
    }
    if (!phone) {
        return res.status(400).send({ message: "Phone is Mandatory" })
    } else {
        if (phone.length > 10 || phone.length < 10) {
            return res.status(400).send({ message: "Please provide valid phone Number" })
        }
        if (!phone.match(/(0|91)?[6-9]{1}[0-9]{9}/g)) {
            return res.status(400).send({ message: "Invalid phone number" })
        }
    }
    if (!user_type) {
        return res.status(400).send({ message: "User Type is Mandatory" })
    }

    try {
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
            phone: phone,
            user_type: user_type,
            isAdmin: false,
            resetLink: ""
        }
        await User.create(data);
        res.status(200).send({ message: "Account created successfully!" })
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": error })
    }

})


export const signUpRouter = router;