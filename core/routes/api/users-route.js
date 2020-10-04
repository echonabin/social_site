const { Router } = require("express");
const usersController = require("../../controllers/users-controller");
const { validateUser } = require("../../middleware/validators/user-validator");
const router = Router();

router.post("/", validateUser, usersController.post_users);

module.exports = router;
