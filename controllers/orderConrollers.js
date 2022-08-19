import  Order  from "../models/orderSchema.js";
import { ObjectId}  from "mongodb";


//create orders
const createOrder = async(req,res)=>{

    console.log("create order");
    try {
      let order = { ...req.body };
      const orderDetails = await Order.create(order);
      res.status(200).send(orderDetails);
    } catch (err) {
      res.status(500).send(err.message);
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

