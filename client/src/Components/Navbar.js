import React, { useReducer } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
function Navbar() {
  const user = useSelector(state => state.user);
  const history = useHistory();
  return (
    <>
      <header id="header" className="d-flex align-items-center  header-transparent navbarGrad">
        <div className="container d-flex align-items-center">
          <div className="logo mr-auto">
            <h1 className="text-light logo"><a href="index.html">
              ХОЧУ В ТЕПЛО
              <img className="logoImg" src='/assets/img/logo1.png' alt='logo'/>
              </a></h1>
          </div>
          <nav className="nav-menu d-none d-lg-block">
            <ul>
              {Boolean(user) ?
                <>
                  <li className='userImg'><img src={user.img} alt='' width="40px" className='userImg'></img></li>
                  <li className='userLogin'>{user.login}</li>
                  <li><Link to="/filter">Туры</Link></li>
                  <li><Link to="/avia">Авиабилеты</Link></li>
                  <li><Link onClick={() => history.push(`/user/${user._id}`)} to="/profile">Личный кабинет</Link></li>
                  {/* <li><Link className="my-menu" to="/about">О нас</Link></li> */}
                  <li><Link className="my-menu" to="/team">Авторы</Link></li>
                  <li><Link className="my-menu" to="/logout">Выйти</Link></li>
                </> :
                <>
                  <li><Link className="my-menu" exact to="/">Главная</Link></li>
                  <li><Link className="my-menu" to="/register">Регистрация</Link></li>
                  <li><Link className="my-menu" to="/login">Вход</Link></li>
                  <li><Link className="my-menu" to="/about">О нас</Link></li>
                  <li><Link className="my-menu" to="/team">Авторы</Link></li>
                </>}
            </ul>
          </nav>
        </div>
      </header>
      {/* <svg style={{ backgroundColor: 'orange' }} className="hero-waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
        <defs>
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g className="wave1">
          <use href="#wave-path" x="50" y="3" fill="rgba(248, 148, 6, .1)" />
        </g>
        <g className="wave2">
          <use href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
        </g>
        <g className="wave3">
          <use href="#wave-path" x="50" y="9" fill="lightgrey" />
        </g>
      </svg> */}
      <svg style={{ backgroundColor: 'rgba(32,108,235,1)' }} className="hero-waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
        <defs>
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g className="wave1">
          <use href="#wave-path" x="50" y="3" fill="rgba(116,246,247, .3)" />
        </g>
        <g className="wave2">
          <use href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .1)" />
        </g>
        <g className="wave3">
          <use href="#wave-path" x="50" y="9" fill="#F2F2E5" />
        </g>
      </svg>
    </>
  )
}
export default Navbar;
