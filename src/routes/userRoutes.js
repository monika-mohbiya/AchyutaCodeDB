// routes/userRoutes.js
import express from "express";
import { postRegister, postLogin, getProfile } from "../controlers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/profile", verifyToken, getProfile);

export default router;
