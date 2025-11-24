// appExpress.js
import express from 'express';
import cors from 'cors';
import apiLogger from "../middlewares/logger.js"
import userRoutes from "../routes/userRoutes.js"
import studentsRoutes from "../routes/studentsRoutes.js"
import logRoutes from "../routes/logRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLogger);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/users", studentsRoutes);
app.use("/logs", logRoutes);

export default app;
