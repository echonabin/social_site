const { Router } = require("express");
const postController = require("../../controllers/posts-controller");
const auth = require("../../middleware/auth");
const { validatePost } = require("../../middleware/validators/post-validator");
const router = Router();

//@route       POST api/posts
//desc         Create a post
//@access      Private

router.post("/", auth, validatePost, postController.post_post);

//@route       GET api/posts
//desc         get all posts from a user
//@access      Private

router.get("/", auth, postController.get_all_posts);

//@route       GET api/posts/:id
//desc         get single posts from post id
//@access      Private

router.get("/:id", auth, postController.get_single_post);

//@route       PUT api/posts/:id
//desc         update single posts from post id
//@access      Private

router.put("/:id", auth, postController.update_single_post);

//@route       DELETE api/posts/:id
//desc         delete single post provided with post id
//@access      Private

router.delete("/:id", auth, postController.delete_post);

module.exports = router;
