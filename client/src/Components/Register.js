import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/userAction';

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value
    const login = event.target.login.value
    const password = event.target.password.value
    dispatch(registerUser({ login, email, password }))
    event.target.email.value = ''
    event.target.login.value = ''
    event.target.password.value = ''
    history.push('/filter');
  };

  return (

  <form onSubmit={handlerSubmit} id="registration-form">
  <div className="registration-email animate__animated animate__fadeInUp">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' />
 </div>
  <div className="registration-login animate__animated animate__fadeInUp">
    <label htmlFor="exampleInputPassword1" className="form-label">Login</label>
    <input type="text" className="form-control" name="login" id="exampleInputPassword1" placeholder='Login' />
  </div>
  <div className="registration-password animate__animated animate__fadeInUp">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder='Password' />
  </div>
  <button type="submit" className="registration-button animate__animated animate__fadeInUp scrollto">Submit</button>
</form>

    // <form type='submit' onSubmit={handlerSubmit}>
    //   <input type='text' name='login' placeholder='Login'/>
    //   <input type='email' name='email' placeholder='Email' />
    //   <input type='password' name='password' placeholder='Password' />
    //   <button type='submit'>Register</button>
    // </form>
  )
}

export default Register;
