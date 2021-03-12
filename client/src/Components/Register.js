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
    history.push('/filter');
  };

  return (
    <>
      <form onSubmit={handlerSubmit} id="registration-form">
        <div className="registration-email animate__animated animate__fadeInUp">
          <label htmlFor="exampleInputEmail1" className="form-label">Ваш адреес электронной почты</label>
          <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' />
        </div>
        <div className="registration-login animate__animated animate__fadeInUp">
          <label htmlFor="exampleInputPassword1" className="form-label">Ваш логин</label>
          <input type="text" className="form-control" name="login" id="exampleInputPassword1" placeholder='Login' />
        </div>
        <div className="registration-password animate__animated animate__fadeInUp">
          <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder='Password' />
        </div>
        <button type="submit" className="registration-button animate__animated animate__fadeInUp scrollto button w">Регистрация</button>
      </form>
      <div className="row">
        <div className="col-md-3">
          <a className="btn btn-outline-dark login-button animate__animated animate__fadeInUp scrollto button p" href="http://localhost:3001/google" role="button">
            <img width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Войти с помощью Google
    </a>
        </div>
      </div>
    </>
  )
}

export default Register;
