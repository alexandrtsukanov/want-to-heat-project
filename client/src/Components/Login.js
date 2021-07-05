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
    history.push('/filter');
  };

  return (
    <>
      <form onSubmit={handlerSubmit} id="login-form">

        <div className="login-login animate__animated animate__fadeInUp">
          <label hrmlFor="exampleInputPassword1" className="form-label">Ваш логин</label>
          <input type="text" className="form-control" name="login" id="exampleInputPassword1" placeholder='Login' />
        </div>
        <div className="login-password animate__animated animate__fadeInUp">
          <label hrmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder='Password' />
        </div>
        <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto button">Войти</button>
      </form>
      <div className="row">
        <div className="col-md-3">
          <a className="btn btn-outline-dark login-button animate__animated animate__fadeInUp scrollto button p" href="https://teplo.herokuapp.com/google" role="button">
            <img width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Войти с помощью Google
    </a>
        </div>
      </div>
    </>
  )
}

export default Login;
