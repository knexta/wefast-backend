import express from 'express';
const router = express.Router();
import { getAllUser,getUserById,updateUser,deleteUserById} from '../controllers/userControllers.js';
import {verifyTokenAndAdmin} from '../middleware/auth.js';
router.get("/",verifyTokenAndAdmin, getAllUser);
router.get("/:id",verifyTokenAndAdmin, getUserById);
router.put("/:id",verifyTokenAndAdmin, updateUser);
router.delete("/:id",verifyTokenAndAdmin,deleteUserById);



export const userRouter=router;

