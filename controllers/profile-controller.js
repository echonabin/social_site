const Profile = require("../models/Profile");
const User = require("../models/User");
const request = require("request");
const config = require("config");
const { response } = require("express");
const { body } = require("express-validator");

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
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Internal Serval error");
  }
};

// @route   DELETE user, profile, posts
//@desc     GET single user with user id
//@access   Private
module.exports.delete_profile = async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json("Profile and User removed successfully");
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Internal Serval error");
  }
};

// @route   profiles/experience
//@desc     Update the profile experience field
//@access   Private

module.exports.update_profile = async (req, res) => {
  const { title, location, company, from, to, current, description } = req.body;
  const newExp = {
    title,
    location,
    company,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // if (profile.experience) {
    //   res.json({ msg: "Required field already fulfilled" });
    // }
    profile.experience.unshift(newExp);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// @route   profiles/experience/:eid
//@desc     delete experience
//@access   Private

module.exports.delete_experience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.eid);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Enternal server error.");
  }
};

// @route   profiles/education
//@desc     Update the profile education field
//@access   Private

module.exports.update_profile = async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // if (profile.experience) {
    //   res.json({ msg: "Required field already fulfilled" });
    // }
    profile.education.unshift(newEdu);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// @route   profiles/education/:eduid
//@desc     delete education
//@access   Private

module.exports.delete_education = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduid);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Enternal server error.");
  }
};

// @route   GET profiles/github/:username
//@desc     get github user repo and info according to username
//@access   Public

module.exports.get_github_info = (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClietId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No github profile found." });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
