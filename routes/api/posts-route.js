const { Router } = require("express");
const postController = require("../../controllers/posts-controller");
const router = Router();

router.get("/", postController.get_post);

module.exports = router;
