import React, { useReducer } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {
  const user = useSelector(state => state.user);

  return (
    <>
      {/* <div>
        <Link classNameNameName='a' to='/'>
          Home
        </Link>
        {user._id ?
          (<>
            <Link classNameNameName='a' to={`/user/${user._id}`}>
              Profile
            </Link>
            <Link classNameNameName='a' to='/logout'>
              Logout
            </Link>
          </>)
          :
          (<>
            <Link classNameNameName='a' to='/login'>
              Login
           </Link>
            <Link classNameNameName='a' to='/register'>
              Register
           </Link>
          </>)
        }
      </div> */}

<header id="header" className="fixed-top d-flex align-items-center  header-transparent ">
    <div className="container d-flex align-items-center">

      <div className="logo mr-auto">
        <h1 className="text-light"><a href="index.html">I want to heat</a></h1>
        {/* Uncomment below if you prefer to use an image logo
        <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"/></a> */}
      </div>

      <nav className="nav-menu d-none d-lg-block">
        <ul>
          <li className="active"><a href="index.html">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Sign Up</a></li>
          <li><a href="#portfolio">Log In</a></li>
          <li><a href="#pricing">Profile</a></li>
          <li><a href="#team">Team</a></li>
          <li className="drop-down"><a href="">Log Out</a>
            {/* <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="drop-down"><a href="#">Drop Down 2</a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
              <li><a href="#">Drop Down 5</a></li>
            </ul> */}
          </li>
          <li><a href="#contact">Contact</a></li>

        </ul>
      </nav>

    </div>
  </header>


    </>
  )
}

export default Navbar;
