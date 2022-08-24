import express from 'express';
const router = express.Router();
import { getAllUser,getUserById,updateUser,deleteUserById} from '../controllers/userControllers.js';
import {verifyTokenAndAdmin} from '../middleware/auth.js';

router.get("/getAllUsers",verifyTokenAndAdmin, getAllUser);
router.get("/getUser/:id",verifyTokenAndAdmin, getUserById);
router.put("/update/:id",verifyTokenAndAdmin, updateUser);
router.delete("/delete/:id",verifyTokenAndAdmin,deleteUserById);



export const userRouter=router;

