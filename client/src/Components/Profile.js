import React, { useEffect } from 'react';
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { showProfileThunk } from '../redux/actions/userAction'
import TourInProfile from './TourInProfile'

function Profile() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    {Boolean(user) ? <Redirect exact to="/"/> :
    dispatch(showProfileThunk())}
  }, [])

  return (
    <>
    <h1>Profile</h1>
    <hr />

    Name: {user.login}
    <div className='flex'>
    {Boolean(user.usersTours.length) && user.usersTours.map((tour) =>
        (
          <TourInProfile
            tour={tour}
            key={tour._id}
          />
        ))}</div>
    </>
  )
}

export default Profile;
