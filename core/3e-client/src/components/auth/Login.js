import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  return (
    <>
      <section className='container'>
        <div className='alert alert-danger'>Invalid credentials</div>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into Your Account
        </p>
        <form
          className='form'
          action='dashboard.html'
          onSubmit={(e) => {
            e.preventDefault();
            console.log(loginData);
          }}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </section>
    </>
  );
};

export default Login;
