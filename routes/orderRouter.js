import express from 'express';
const router = express.Router();
import {createOrder,updateOrder,deleteOrder,getOrderById,getAllOrders} from '../controllers/orderConrollers.js';

router.post("/create",createOrder);
router.get("/getall",getAllOrders);
router.get("/find/:userId",getOrderById);
router.put("/update/:id",updateOrder);
router.delete("/delete/:id",deleteOrder);

export const orderRouter=router;

