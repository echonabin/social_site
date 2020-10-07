import React from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
//Redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
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
        <>Has</>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
