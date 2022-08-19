import express from 'express';
const router = express.Router();
import {createOrder,updateOrder,deleteOrder,getOrderById,getAllOrders} from '../controllers/orderConrollers.js';

router.post("/",createOrder);
router.get("/",getAllOrders);
router.get("/:id",getOrderById);
router.put("/:id",updateOrder);
router.delete("/:id",deleteOrder);

export const orderRouter=router;

