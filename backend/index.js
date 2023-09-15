import express from "express";
import mysql from "mysql";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2203",
  database: "carhive",
});



app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.use("/backend/posts", postRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);

app.listen(8800, () => {
  console.log("Connected!!!");
});
