const { check, validationResult } = require("express-validator");

exports.updateProfileValidation = [
  check("title", "Title field should not be empty").not().isEmpty(),
  check("company", "Company field should not be empty").not().isEmpty(),
  check("from", "From date should not be empty").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.updateProfileEducationValidation = [
  check("school", "School field should not be empty").not().isEmpty(),
  check("degree", "Degree field should not be empty").not().isEmpty(),
  check("fieldofstudy", "Field Of Study date should not be empty")
    .not()
    .isEmpty(),
  check("from", "From date should not be empty").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
