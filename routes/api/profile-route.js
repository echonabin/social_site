const { Router } = require("express");
const profileController = require("../../controllers/profile-controller");
const auth = require("../../middleware/auth");
const {
  validateProfilePost,
} = require("../../middleware/validators/profile-post-validator");
const router = Router();

//get single profile if exists with private route
router.get("/me", auth, profileController.get_profile);
//Creates the profile and update if already exists with private route
router.post("/", auth, validateProfilePost, profileController.post_profile);
//get all profiles with public routes
router.get("/", profileController.get_profiles);
//get single user with user Id
router.get("/user/:uid", profileController.get_single_profile);

module.exports = router;
