const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
module.exports.get_auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports.post_auth = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.json({ errors: [{ msg: "Invalid Credential" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credential" }] });
    }
    //Creates JSON TOKEN
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    const error = err.message;
    console.log(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
};
