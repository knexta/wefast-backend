import dotenv from 'dotenv';
import express from 'express';
import twilio from 'twilio';
// import { MongoClient } from "mongodb";

import cors from 'cors';
import { mongo } from "./connection.js"
import { loginRouter } from "./controllers/login.js";
import { signUpRouter } from "./controllers/signup.js";
import { forgotPasswordRouter } from "./controllers/forgetPassword.js";
import { resetPasswordRouter } from "./controllers/resetPassword.js";
import { userRouter } from "./routes/userRouter.js";
import { orderRouter } from './routes/orderRouter.js';
import { distanceRouter } from './controllers/calculatingPrice.js';
// import {paymentRouter} from "./controllers/payment.js";
// import {verifyRouter} from "./controllers/verifyPayment.js"
import Razorpay from "razorpay";
import shortid from "shortid";
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
  const accountSid = 'AC10d32a8b507f05c59ad3717683ab7474';
  const authToken = 'df53eea0ce8446f865577e2dfcf5cec6';
  // const client = require('twilio')(accountSid, authToken);
  // const {accountSid, authToken}
  const otp = 1100
  const client = twilio(accountSid, authToken)
  client.messages
    .create({
      body: `Please enter the OTP to verify , here is your otp ${otp}`,
      messagingServiceSid: 'MG10e1c0a70d2f1c094e8ab6dc1e981db9',
      to: '+9190350 65446'
    })
    .then(message => console.log(message.sid))
    .done();
  response.send("Hello World...");
})

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/payment", (req, res) => {

  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: shortid.generate()
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send({ orderId: order.id });
  });
})

app.post("/api/payment/verify", (req, res) => {

  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { "signatureIsValid": "false" }
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { "signatureIsValid": "true" }
  res.send(response);
});



app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/forgot-password", forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/price", distanceRouter);
// app.use("/payment",paymentRouter);
// app.use("/api/payment/verify",verifyRouter);


app.use("/users", userRouter);
app.use("/order", orderRouter);


app.listen(PORT, () => console.log("App is started in ", PORT));