const { check, validationResult } = require("express-validator");

exports.validateUserLogin = [
  check("email", "Please enter valid email address").isEmail(),
  check("password", "Password field is required.").exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
