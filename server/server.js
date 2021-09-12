import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Importing routes
import postRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
//Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API of Memories by Frank Maruf",
  });
});
app.use("/posts", postRouter);
app.use("/user", userRouter);

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
