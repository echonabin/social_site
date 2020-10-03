const Post = require("../models/Post");
const User = require("../models/User");
const router = require("../routes/api/auth-route");
const auth = require("../middleware/auth");

//@route       POST api/posts
//desc         Create a post
//@access      Private
module.exports.post_post = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    const Posts = new Post(newPost);
    const posts = await Posts.save();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

//@route       GET api/posts
//desc         get all posts from a user
//@access      Private

module.exports.get_all_posts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//@route       GET api/posts/:id
//desc         get single posts from post id
//@access      Private

module.exports.get_single_post = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found." });
    }
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//@route       DELETE api/posts/:id
//desc         delete single post provided with post id
//@access      Private

module.exports.delete_post = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.user.toString() === user._id.toString())
      await Post.findByIdAndRemove(postId);
    else {
      res.status(400).json("This post dosen't belog to you");
    }
    res.json("Post Deleted Succesfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
