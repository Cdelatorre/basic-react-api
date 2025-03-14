const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [EMAIL_PATTERN, "Email is invalid"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    virtuals: true,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
