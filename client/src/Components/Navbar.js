import React, { useReducer } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {

  const user = useSelector(state => state.user);
  const history = useHistory();
  console.log(user)
  return (
    <>

  <header style={{backgroundColor: '#142433'}} id="header" className="d-flex align-items-center  header-transparent ">
    <div className="container d-flex align-items-center">

      <div className="logo mr-auto">
        <h1 className="text-light"><Link exact to="/">Хочу в тепло!</Link></h1>
      </div>

      <nav className="nav-menu d-none d-lg-block">
        <ul>
          {Boolean(user) ? 
          <>
          <li><img src={user.img} alt='' width="40px" className='userImg'></img></li>
          <li className='userLogin'>{user.login}</li>
          <li><Link to="/filter">Туры</Link></li>
          <li><Link onClick={() => history.push(`/user/${user._id}`)} to="/profile">Личный кабинет</Link></li>
          <li><Link to="/avia">Авиабилеты</Link></li>
          <li><Link className="my-menu" to="/about">О нас</Link></li>
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
    <svg style={{backgroundColor: '#142433'}} class="hero-waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
      <defs>
        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
      </defs>
      <g class="wave1">
        <use href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)"/>
      </g>
      <g class="wave2">
        <use href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)"/>
      </g>
      <g class="wave3">
        <use href="#wave-path" x="50" y="9" fill="lightgrey"/>
      </g>
    </svg>


    </>
  )
}

export default Navbar;
