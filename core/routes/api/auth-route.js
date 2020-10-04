const { Router } = require("express");
const authController = require("../../controllers//auth-controller");
const {
  validateUserLogin,
} = require("../../middleware/validators/user-login-validator");
const auth = require("../../middleware/auth");
const router = Router();

router.get("/", auth, authController.get_auth);
router.post("/", validateUserLogin, authController.post_auth);

module.exports = router;
