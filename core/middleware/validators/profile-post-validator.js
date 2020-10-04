const { check, validationResult } = require("express-validator");

exports.validateProfilePost = [
  check("status", "Status is required field").not().isEmpty(),
  check("skills", "Skills is required field.").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
