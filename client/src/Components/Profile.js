import React, { useEffect,useState } from 'react';
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { showProfileThunk, checkUserSession } from '../redux/actions/userAction'
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
    <h1>Профиль</h1>
    <hr />

    <h1>Имя: <strong>{user.login}</strong></h1>
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
