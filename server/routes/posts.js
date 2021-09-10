import express from "express";
import mongoose from "mongoose";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
