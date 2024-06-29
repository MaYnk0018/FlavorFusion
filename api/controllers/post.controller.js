import express from "express";
import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
// verify user
// post
//error or faliure handling

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "you ARE not ADMIN"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "all fields required "));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
    
  try {
    const post = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
      });
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
