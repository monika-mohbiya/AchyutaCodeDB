import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { getCrtTask, postCrtTask } from "../../controlers/workStatusController/project.controller.js";

const router = express.Router();

router.get("/add-task", verifyToken, postCrtTask);
router.get("/projects", verifyToken, getCrtTask);
