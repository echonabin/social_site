import React from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import DashboardAction from "./DashboardAction";
//Redux
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        {"  "}Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i>Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            You don't have created your profile yet! Please create one first.
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Your Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
