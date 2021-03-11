import React, { useEffect,useState } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../redux/actions/userAction'
import TourInProfile from './TourInProfile'

function Profile() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log('===>>>', user)
  const [usersTours, setUsersTours] = useState('')

  useEffect(() => {
    {!Boolean(user) ? <Redirect exact to="/"/> :
    dispatch(checkUserSession())}
  }, [])


  return (
    <>
    <h1>Личный кабинет</h1>
    <hr />
    <div className='flex-prof'>
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
