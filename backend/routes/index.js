import express from "express";
import authRoutes from "./authRoutes.js";
import accountRoutes from "./accountRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

//for authRoutes /auth is the root for that file
router.use("/auth", authRoutes);
//for userRoutes /user is the root for that file
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/transaction", transactionRoutes);

export default router;
