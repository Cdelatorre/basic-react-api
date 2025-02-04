const { Router } = require("express");
const router = Router();

const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const postController = require("../controllers/post.controller");
const authController = require("../controllers/auth.controller");
const likesController = require("../controllers/likes.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const upload = require("../config/storage.config");

router.get("/", miscController.home);

/* AUTH */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuthenticated, authController.getUser);

/* USERS */
router.get("/users", usersController.list);
router.get("/users/:id", usersController.detail);
router.post("/users", usersController.create);
router.patch("/users/:id", usersController.edit);
router.delete("/users/:id", usersController.delete);

/* POSTS */

router.get("/posts", isAuthenticated, postController.list);
router.post(
  "/posts",
  isAuthenticated,
  upload.single("imageUrl"),
  postController.create
);
router.get("/posts/:id", postController.detail);
router.patch("/posts/:id", isAuthenticated, postController.edit);
router.delete("/posts/:id", isAuthenticated, postController.delete);

/* LIKES */

router.post("/posts/:postId/like", isAuthenticated, likesController.like);
router.get("/likes", isAuthenticated, likesController.list);

module.exports = router;
