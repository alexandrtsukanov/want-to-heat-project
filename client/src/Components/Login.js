import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/actions';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value
    dispatch(loginUser(email, password))
    history.push('/');
  };

  return (
    <form type='submit' onSubmit={handlerSubmit}>
      <input type='email' name='email' placeholder='Email' />
      <input type='password' name='password' placeholder='Password' />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login;
