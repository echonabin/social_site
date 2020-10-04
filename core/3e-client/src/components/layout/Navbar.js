import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <NavLink to='/'>
          <i className='fas fa-code'></i> 3e.dev
        </NavLink>
      </h1>
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
    </nav>
  );
};

export default Navbar;
