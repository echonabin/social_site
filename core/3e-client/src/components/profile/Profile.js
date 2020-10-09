import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProfileTop from "./ProfileTop";

//Redux
import { connect } from "react-redux";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Profile = ({
  getProfileByID,
  auth,
  match,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID]);
  return (
    <>
      {profile === null || loading === true ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
