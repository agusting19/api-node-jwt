import express, { Application } from "express";
import authRoutes from "./routes/auth";
import morgan from "morgan";

const app: Application = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
