const { Router } = require("express");
const router = Router();

const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

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

module.exports = router;
