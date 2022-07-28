import dotenv from 'dotenv';
import express from 'express';
// import { MongoClient } from "mongodb";

import cors from 'cors';
import { mongo } from "./connection.js"
import { loginRouter } from "./controllers/login.js";
import { signUpRouter } from "./controllers/signup.js";
import { forgotPasswordRouter } from "./controllers/forgetPassword.js";
import { resetPasswordRouter } from "./controllers/resetPassword.js";
import { userRouter} from "./routes/userRouter.js";
import { auth } from "./middleware/auth.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Mongo DB connection
const MONGO_URL = process.env.MONGO_URL;

//Mongo db connection
mongo();


app.get("/", (request, response) => {
    response.send("Hello World...");
})



app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/forgot-password", forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);


app.use("/users",userRouter);


app.listen(PORT, () => console.log("App is started in ", PORT));