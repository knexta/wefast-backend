import express from 'express';
const router = express.Router();
import { getAllUser,getUserById,updateUser,deleteUserById} from '../controllers/userControllers.js';
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id",deleteUserById);



export const userRouter=router;

