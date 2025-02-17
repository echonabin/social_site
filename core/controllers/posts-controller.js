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

//@route       PUT api/posts/:id
//desc         update single posts from post id
//@access      Private

module.exports.update_single_post = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const { text } = req.body;
  const updatePost = {
    text,
  };
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.user.toString() === user._id.toString()) post.text = text;
    else {
      res.status(400).json("Can't update, this post dosen't belog to you");
    }
    const update = await post.save();
    res.json(update);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//@route       PUT api/posts/likes/:id
//desc         Like single posts
//@access      Private

module.exports.like_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has been liked already
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post had been already liked!" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

//@route       DELETE api/posts/:id
//desc         unlike a post with a user
//@access      Private

module.exports.unlike_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has been liked already
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post had not been liked yet!" });
    }
    //Get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
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

//@route       POST api/posts/comment/:id
//desc         Create a comments
//@access      Private

module.exports.post_comment = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(req.params.id);
  try {
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

//@route       DELETE api/posts/comment/:id/:comment_id
//desc         delete comment from single post with provided post id and comment id
//@access      Private

module.exports.delete_comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Get comment from post

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Check comment exists

    if (!comment) res.status(400).json({ msg: "Comment doesn't exists." });

    //Check user
    if (comment.user.toString() !== req.user.id)
      res.status(401).json({ msg: "User not authorized." });

    const removeIndex = post.likes
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
