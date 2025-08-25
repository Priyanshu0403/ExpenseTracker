import express from "express";
import { changePassword, getUser, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//here /user is the root for this file
router.get("/",authMiddleware,getUser);
router.put("/change-password",authMiddleware,changePassword);
// router.put("/:id",authMiddleware,updateUser);
router.put("/",authMiddleware,updateUser);


export default router;