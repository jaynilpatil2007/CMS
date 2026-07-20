import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoute from "./routes/auth.route.js"
import editRoute from "./routes/edit.route.js"
import contentRoute from "./routes/content.route.js"

app.use("/api/admin", authRoute);
app.use("/api/edit", editRoute);
app.use("/api/content", contentRoute);

export default app;