import express from "express";
import { register } from "../controllers/auth.js";

const app = express.Router();

app.post("/register", register);

export default app;
