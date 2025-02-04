const Like = require("../models/Like.model"); // Adjust the path as necessary
const Post = require("../models/Post.model");

module.exports.like = async (req, res, next) => {
  try {
    const userId = req.currentUserid;
    const postId = req.params.postId;

    // Check if the like already exists
    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      // If like exists, remove it
      await Like.deleteOne({ _id: existingLike._id });
      res.status(200).json({ message: "Like removed" });
    } else {
      const newLike = new Like({ user: userId, post: postId });
      await newLike.save();
      res.status(201).json({ message: "Like added" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const myPosts = await Post.find({ user: req.currentUserid });
    const likes = await Like.find({
      post: { $in: myPosts.map((post) => post._id) },
    }).populate("post user");

    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }

  /*
    THEN & CATCH STYLE

    Post.find({ user: req.currentUserid })
      .then((posts) => {
        const postIds = posts.map((post) => post._id);

        return Like.find({ post: { $in: postIds } }).populate("post user");
      })
      .then((likes) => {
        res.status(200).json(likes);
      })
      .catch(next);
  */
};
