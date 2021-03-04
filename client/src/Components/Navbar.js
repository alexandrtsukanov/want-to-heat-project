import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {
  const user = useSelector(state => state.user);

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default Navbar;
