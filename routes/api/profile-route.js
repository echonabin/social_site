const { Router } = require("express");
const profileController = require("../../controllers/profile-controller");
const router = Router();

router.get("/", profileController.get_profile);

module.exports = router;
