import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from '../src/redux/actions/actions';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Search from './Components/Search';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    (dispatch(checkUserSession()))
  }, [])


  return (
    <>
      <Router>
        <Navbar />
        <Home />
        <Switch>
          <Route exact path='/'>
            {user._id ?
              <Search /> :
              <h2>Please login or register first</h2>
              // (<div>Content</div>)
              // :
              // (<h2>Please login or register first</h2>)
            }
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/login'>
             <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/user/:id'>
            <Profile />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
