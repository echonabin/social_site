import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div class='profile-about bg-light p-2'>
    {bio && (
      <>
        <h2 class='text-primary'>{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
      </>
    )}

    <div class='line'></div>
    <h2 class='text-primary'>Skill Set</h2>
    <div className='skills'>
      {skills.map((skill, index) => (
        <div class='p-1' key={index}>
          <i class='fa fa-check'></i> {skill}
        </div>
      ))}
    </div>
  </div>
);
ProfileAbout.propTypes = {
  profile: PropTypes.func.isRequired,
};

export default ProfileAbout;
