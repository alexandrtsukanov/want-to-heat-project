import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const login = event.target.login.value
    const password = event.target.password.value
    dispatch(loginUser(login, password))
    event.target.login.value = ''
    event.target.password.value = ''
    history.push('/filter');
  };

  return (

  <form onSubmit={handlerSubmit}>

    <div className="mb3">
      <label hrmlFor="exampleInputPassword1" className="form-label">Login</label>
      <input type="text" className="form-control" name="login" id="exampleInputPassword1" placeholder='Login' />
    </div>
    <div className="mb3">
      <label hrmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder='Password' />
    </div>
    <button class="btn-get-started" type="submit" className="btn btn-primary">Log In</button>
  </form>

    // <form type='submit' onSubmit={handlerSubmit}>
    //   <input type='email' name='email' placeholder='Email' />
    //   <input type='password' name='password' placeholder='Password' />
    //   <button type='submit'>Login</button>
    // </form>
  )
}

export default Login;
