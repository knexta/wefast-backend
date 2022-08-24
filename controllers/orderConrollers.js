import  Order  from "../models/orderSchema.js";
import { ObjectId}  from "mongodb";


//create orders
const createOrder = async(req,res)=>{

  const { weight,pickup_address,pickup_mobile_no,pickup_landmark,pickup_contact_person,your_order_no,buying_option,delivery_address,delivery_mobile_no,delivery_landmark,delivery_contact_person,delivery_option}=req.body;


if(!weight) return res.status(400).send({message:"Weight is mandatory...."});
if(!pickup_address) return res.status(400).send({message:"pickup address is mandatory...."})
if(!pickup_mobile_no) return res.status(400).send({message:"pickup_mobile_no is mandatory...."})
if(!pickup_landmark) return res.status(400).send({message:"pickup_landmrk is mandatory...."})
if(!delivery_address) return res.status(400).send({message:"delivery_address is mandatory...."})
if(!delivery_mobile_no) return res.status(400).send({message:"delivery_mobile_no is mandatory...."})
if(!delivery_landmark) return res.status(400).send({message:"delivery_landmrk is mandatory...."})


 console.log("create order");
    try {
      // let order = { ...req.body };
      let order = { 
        weight:weight,
        pickup_address:pickup_address,
        pickup_mobile_no:pickup_mobile_no,
        pickup_landmark:pickup_landmark,
        pickup_contact_person:pickup_contact_person,
        your_order_no: your_order_no,
        buying_option:buying_option,
        delivery_address:delivery_address,
        delivery_mobile_no:delivery_mobile_no,
        delivery_landmark:delivery_landmark,
        delivery_contact_person:delivery_contact_person,
        delivery_option:delivery_option
       };
      const orderDetails = await Order.create(order);
      return res.status(200).send(orderDetails);
    } catch (err) {
      return res.status(500).send(err.message);
    }
}

//update order

const updateOrder = async(req,res)=>{
    console.log("update order");
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: req.body },
        { ReturnDocument: "after" }
      );
      res.status(200).send(updatedOrder);
    } catch (err) {
      res.status(500).send(err.message);
    }
}


//delete order

const deleteOrder = async(req,res)=>{
    console.log("delete order");
    try {
      await Order.deleteOne({ _id: ObjectId(req.params.id) });
      res.status(200).send(" Order deleted");
    } catch (err) {
      res.status(500).send(err.message);
    }
}


//get order by user id

const getOrderById = async(req,res)=>{
    console.log("get order");
    try {
      const get = await Order.find({ userId: req.params.userId });
      console.log(get);
      res.status(200).send(get);
    } catch (err) {
      res.status(500).send(err.message);
    }
}

//get 5 orders

const getAllOrders = async(req,res)=>{
    console.log("get all order");
    try {
      const orders = await Order.find().limit(5);
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send(err.message);
    }
}


export {createOrder,updateOrder,deleteOrder,getOrderById,getAllOrders};

