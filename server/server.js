import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Middlewares
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

//Importing routes
import postRouter from "./routes/posts.js";
//Routes
// app.use("/", (req, res) => {
//   // res.send(
//   //   "<div style=text-align:center>Welcome to the API of Memories by <h1>Frank Maruf<h1></div>"
//   // );
//   res.json({
//     message: "Welcome to the API of Memories by Frank Maruf",
//   });
// });
app.use("/posts", postRouter);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
