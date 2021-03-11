import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './redux/actions/userAction';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Filter from './Components/Filter';
import Team from './Components/Team';
import About from './Components/About';
// import Footer from './Components/Footer';
import FilterAvia from './Components/FilterAvia';
import DraftFilter from './Components/DraftFilter';
import DraftCountry from './Components/DraftCountry';
import DraftTour from './Components/DraftTour';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    (dispatch(checkUserSession()))
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/avia'>
            <FilterAvia />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/filter'>
            <DraftFilter />
          </Route>

          {/* <Route path='/filter'>
            <Filter />
          </Route> */}


          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/team'>
            <Team />
          </Route>
          <Redirect to='/' />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
