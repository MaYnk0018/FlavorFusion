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

//get all posts by searches
export const getposts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
      ...(req.query.postId && { _Id: req.query.postId }),
      ...(req.query.slug && { slug: req.query.slug }),
    })
      .sort({ updatedAt: sortDirection })
      .limit(limit)
      .skip(startIndex);
    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
