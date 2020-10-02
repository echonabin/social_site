const { Router } = require("express");
const profileController = require("../../controllers/profile-controller");
const auth = require("../../middleware/auth");
const {
  validateProfilePost,
} = require("../../middleware/validators/profile-post-validator");
const {
  updateProfileValidation,
} = require("../../middleware/validators/profile-put-validation");
const {
  updateProfileEducationValidation,
} = require("../../middleware/validators/profile-put-validation");
const { route } = require("./users-route");
const router = Router();

//get single profile if exists with private route
router.get("/me", auth, profileController.get_profile);
//Creates the profile and update if already exists with private route
router.post("/", auth, validateProfilePost, profileController.post_profile);
//get all profiles with public routes
router.get("/", profileController.get_profiles);
//get single user with user Id
router.get("/user/:uid", profileController.get_single_profile);
//Delete user and profile associated with id
router.delete("/", auth, profileController.delete_profile);
//Update user profile experiences
router.put(
  "/experience",
  auth,
  updateProfileValidation,
  profileController.update_experience
);
//Delete experiences
router.delete("/experience/:eid", auth, profileController.delete_experience);
//Update user profile education
router.put(
  "/education",
  auth,
  updateProfileEducationValidation,
  profileController.update_education
);
//Delete education
router.delete("/education/:eduid", auth, profileController.delete_education);
//Get github user details
router.get("/github/:username", profileController.get_github_info);
module.exports = router;
