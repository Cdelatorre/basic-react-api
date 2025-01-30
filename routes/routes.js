const { Router } = require("express");
const router = Router();

const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");

router.get("/", miscController.home);

/* USERS */
router.get("/users", usersController.list);
router.get("/users/:id", usersController.detail);
router.post("/users", usersController.create);
router.patch("/users/:id", usersController.edit);
router.delete("/users/:id", usersController.delete);

module.exports = router;
