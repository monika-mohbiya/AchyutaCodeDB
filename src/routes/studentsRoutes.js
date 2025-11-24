import express from "express";
import { getStudents, getStudentByfilter } from "../controlers/student.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/students", verifyToken, getStudents);
router.get("/student/:search", verifyToken, getStudentByfilter);
export default router;