const Post = require("../models/Post.model");
const Like = require("../models/Like.model");

// Get all posts
module.exports.list = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").populate("likes");
    const likes = await Like.find({ user: req.currentUserid });

    res.status(200).json({ posts, likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID
module.exports.detail = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
module.exports.create = async (req, res) => {
  if (req.file) req.body.imageUrl = req.file.path;

  const post = new Post({
    user: req.currentUserid,
    imageUrl: req.body.imageUrl,
    caption: req.body.caption,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a post by ID
module.exports.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post by ID
module.exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
