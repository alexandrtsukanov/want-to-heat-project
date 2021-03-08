import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/App.css';
// import './assets/css/style.css'
// import './assets/vendor/animate.css/animate.compat.css'
// import './assets/vendor/animate.css/animate.css'
// import './assets/vendor/animate.css/animate.min.css'
// import './assets/vendor/aos/aos.css'
// import './assets/vendor/bootstrap/css/bootstrap-grid.css'
// import './assets/vendor/bootstrap/css/bootstrap-grid.css.map'
// import './assets/vendor/bootstrap/css/bootstrap-grid.min.css'
// import './assets/vendor/bootstrap/css/bootstrap-grid.min.css.map'
// import './assets/vendor/bootstrap/css/bootstrap-reboot.css'
// import './assets/vendor/bootstrap/css/bootstrap-reboot.css.map'
// import './assets/vendor/bootstrap/css/bootstrap-reboot.min.css'
// import './assets/vendor/bootstrap/css/bootstrap-reboot.min.css.map'
// import './assets/vendor/bootstrap/css/bootstrap.css'
// import './assets/vendor/bootstrap/css/bootstrap.css.map'
// import './assets/vendor/bootstrap/css/bootstrap.min.css'
// import './assets/vendor/bootstrap/css/bootstrap.min.css.map'
// import './assets/vendor/boxicons/css/animations.css'
// import './assets/vendor/boxicons/css/boxicons.css'
// import './assets/vendor/boxicons/css/boxicons.min.css'
// import './assets/vendor/boxicons/css/transformations.css'
// import './assets/vendor/icofont/icofont.min.css'
// import './assets/vendor/line-awesome/css/line-awesome.css'
// import './assets/vendor/line-awesome/css/line-awesome.min.css'
// import './assets/vendor/owl.carousel/assets/owl.carousel.css'
// import './assets/vendor/owl.carousel/assets/owl.carousel.min.css'
// import './assets/vendor/owl.carousel/assets/owl.theme.default.css'
// import './assets/vendor/owl.carousel/assets/owl.theme.default.min.css'
// import './assets/vendor/owl.carousel/assets/owl.theme.green.css'
// import './assets/vendor/owl.carousel/assets/owl.theme.green.min.css'
// import './assets/vendor/remixicon/remixicon.css'
// import './assets/vendor/venobox/venobox.css'
// import './assets/vendor/venobox/venobox.min.css'

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
