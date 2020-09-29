const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

module.exports.post_users = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    user = new User({
      name,
      email,
      password,
      avatar,
    });
    //Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
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
