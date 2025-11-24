import express from "express";
import { getClerk } from "../controlers/uploads/clerk.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/clerk", verifyToken, getClerk);
router.get("/clerk", verifyToken, getPeon);
export default router;