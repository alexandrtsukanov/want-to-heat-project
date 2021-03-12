import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

function Home () {
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

<section id="hero" class="home d-flex flex-column justify-content-end align-items-center">
    <div id="heroCarousel" data-bs-interval="5000" class="container carousel carousel-fade" data-bs-ride="carousel">
      <div className="carousel-item active">
        <div className="carousel-container">
          <h2 style={{fontSize: '48px'}} className="animate__animated animate__fadeInDown">Хочу в тепло!</h2>
          <p style={{fontSize: '24px'}} className="animate__animated animate__fadeInUp">"Хочу в тепло!" - это уникальный сервис, который позволяет найти и подобрать для Вас путёвки и авиабилеты, основываясь на температуре воздуха в желаемой Вами локации. С нашей помощью Вы сможете найти подходящий тур или авиабилет максимально быстро!</p>
          <div>

          <span id="btn-get-started-left">
          <Link to="/register" style={{width: '5.6cm', textAlign: 'center'}} className="btn-register-home btn-get-started animate__animated animate__fadeInUp scrollto">Регистрация</Link>
          </span>
          <span id="btn-get-started-right">
          <Link to="/login" className="btn-get-started animate__animated animate__fadeInUp scrollto">Войти</Link>
          </span>
          </div>

        </div>
      </div>
    </div>

    <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
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
        <use href="#wave-path" x="50" y="9" fill="#f2f2e5"/>
      </g>
    </svg>

    </section>

    // <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
      // <defs>
      //   <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
      // </path></defs>
      // <g class="wave1">
      //   <use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)">
      // </use></g>
      // <g class="wave2">
      //   <use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)">
      // </use></g>
      // <g class="wave3">
      //   <use xlink:href="#wave-path" x="50" y="9" fill="#fff">
      // </use></g>
    // </svg>

  )
}

export default Home;
