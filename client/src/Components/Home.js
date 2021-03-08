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

<section id="hero" class="d-flex flex-column justify-content-end align-items-center">
    <div id="heroCarousel" data-bs-interval="5000" class="container carousel carousel-fade" data-bs-ride="carousel">

      {/* <!-- Slide 1 --> */}
      <div class="carousel-item">
        <div class="carousel-container">
          <h2 class="animate__animated animate__fadeInDown">Welcome to <span>Selecao</span></h2>
          <p class="animate__animated fanimate__adeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
          <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
        </div>
      </div>

      {/* <!-- Slide 2 --> */}
      <div class="carousel-item active">
        <div class="carousel-container">
          <h2 style={{fontSize: '48px'}} class="animate__animated animate__fadeInDown">I want to heat</h2>
          <p style={{fontSize: '24px'}} class="animate__animated animate__fadeInUp">I want to heat - the coolest app ever developed. Lorem ipsum dolorem. Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam.</p>
          <div>

          <span id="btn-get-started-left">
          <Link to="/register" class="btn-get-started animate__animated animate__fadeInUp scrollto">Sign Up</Link>
          </span>
          <span id="btn-get-started-right">
          <Link to="/login" class="btn-get-started animate__animated animate__fadeInUp scrollto">Log In</Link>
          </span>
          </div>

        </div>
      </div>

      {/* <!-- Slide 3 --> */}
      <div class="carousel-item">
        <div class="carousel-container">
          <h2 class="animate__animated animate__fadeInDown">Sequi ea ut et est quaerat</h2>
          <p class="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
          <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
        </div>
      </div>

      {/* <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
      </a> */}

      {/* <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
      </a> */}

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
        <use href="#wave-path" x="50" y="9" fill="yellow"/>
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
