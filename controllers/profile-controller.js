const Profile = require("../models/Profile");

// @route   GET api/profile/me
//@desc     GET current user profile
//@access   Private
module.exports.get_profile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
  }
};
// @route   POST api/profile
//@desc     POST new user profile
//@access   Private
module.exports.post_profile = async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin,
  } = req.body;
  //Build profile object

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  //Build Social Object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    //Here user is from the linked object of profile with user model.
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //Create
    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/profiles
//@desc     GET all profiles from database
//@access   Public

module.exports.get_profiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Serval error");
  }
};

// @route   GET api/profiles/user/:user_id
//@desc     GET single user with user id
//@access   Public

module.exports.get_single_profile = async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.uid,
    }).populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no profie for this user" });
    }
    res.status(500).send("Internal Serval error");
  }
};
