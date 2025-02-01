const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      maxlength: 2200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  count: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
