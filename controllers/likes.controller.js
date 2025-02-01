const Like = require("../models/Like.model"); // Adjust the path as necessary

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
