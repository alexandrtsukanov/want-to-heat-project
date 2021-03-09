import React, { useReducer } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {

  const user = useSelector(state => state.user);
  const history = useHistory();

  return (
    <>
      {/* <div>
        <Link className='a' to='/'>
          Home
        </Link>
        {user._id ?
          (<>
            <Link className='a' to={`/user/${user._id}`}>
              Profile
            </Link>
            <Link className='a' to='/logout'>
              Logout
            </Link>
          </>)
          :
          (<>
            <Link className='a' to='/login'>
              Login
           </Link>
            <Link className='a' to='/register'>
              Register
           </Link>
          </>)
        }
      </div> */}

  <header style={{backgroundColor: '#142433'}} id="header" className="d-flex align-items-center  header-transparent ">
    <div className="container d-flex align-items-center">

      <div className="logo mr-auto">
        <h1 className="text-light"><a href="index.html">I want to heat</a></h1>
        {/* Uncomment below if you prefer to use an image logo
        <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"/></a> */}
      </div>

      <nav className="nav-menu d-none d-lg-block">
        <ul>
          {Boolean(user) ? 
          <>
          <li className=""><Link exact to="/">Home</Link></li>
          <li><Link to="/filter">Search</Link></li>
          <li><Link onClick={() => history.push(`/user/${user._id}`)} to="/profile">Profile</Link></li>
          <li><Link to="/avia">Авиа</Link></li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/logout">Log Out</Link></li>
          </> : 
          <>
          <li className=""><Link exact to="/">Home</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/logout">Log Out</Link></li>
          </>}
          
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

          {/* <li><a href="#contact">Contact</a></li> */}

        </ul>
      </nav>

    </div>
  </header>


    </>
  )
}

export default Navbar;
