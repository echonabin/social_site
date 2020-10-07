import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <NavLink to='/dashboard' activeStyle={{ color: "#17A2B8" }}>
          <i className='fas fa-user'></i>
          {"  "}
          <span className='hide-sm'>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          {"  "} <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/developers' activeStyle={{ color: "#17A2B8" }}>
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink to='/register' activeStyle={{ color: "#17A2B8" }}>
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to='/login' activeStyle={{ color: "#17A2B8" }}>
          Login
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <NavLink to='/'>
          <i className='fas fa-code'></i> 3e.dev
        </NavLink>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
