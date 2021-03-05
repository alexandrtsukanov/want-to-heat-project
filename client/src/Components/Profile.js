import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/actions';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const login = event.target.login.value
    const email = event.target.email.value
    const password = event.target.password.value
    dispatch(registerUser(login, email, password))
    history.push('/');
  };

  return (
    <form type='submit' onSubmit={handlerSubmit}>
      <input type='text' name='login' placeholder='Login'/>
      <input type='email' name='email' placeholder='Email' />
      <input type='password' name='password' placeholder='Password' />
      <button type='submit'>Register</button>
    </form>
  )
}

export default Profile;
