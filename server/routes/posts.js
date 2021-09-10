import express from "express";
import mongoose from "mongoose";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.patch("/:id/unLikePost", unLikePost);

export default router;
