import express from "express";
import { getEndpointHitDetails } from "../controlers/logs.js"
express.Router();
const router = express.Router();

router.get("/endpoint-details", getEndpointHitDetails);

export default router;