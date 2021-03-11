import * as TYPES from '../types/types';


//====================session========================
export function checkUser(data) {
  return {
    type: TYPES.CHECK_USER_SESSION,
    data,
  }
}

const checkUserSession = () => (dispatch) => {
    fetch('/login')
    .then(res => res.status === 200 ? res.json() : null)
    .then(data => {
      dispatch(checkUser(data));
    })
}

// //===================login=========================
export function signInUser(data) {
  return {
    type: TYPES.VERIFY_USER,
    data,
  }
}

const loginUser = (login, password) => (dispatch) => {
  console.log(login, password)
  fetch('/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    })
  },
  {credentials: 'include'})
    .then(res => res.status === 200 ? res.json() : {})
    .then(data => {
      dispatch(signInUser(data));
    })
}
//==============google auth==============
const loginUserByGoogle = () => (dispatch) => {
  console.log('google hi')
  fetch('http://localhost:3001/google')
    .then(res => res.status === 200 ? res.json() : {})
    .then(data => {
      dispatch(signInUser(data));
    })
}
//========================logout====================
export function removeUser() {
  return {
    type: TYPES.VERIFY_USER,
    data: null
  }
}
export function removeTours() {
  return {
    type: TYPES.SET_TOURS,
    data: []
  }
}

const logoutUser = () => (dispatch) => {
  fetch('/logout', {credentials: 'include'})
    .then(res => res.status === 200 ? dispatch(removeUser()) : null)
}

//===================registration===================

export function signUpUser(data) {
  return {
    type: TYPES.VERIFY_USER,
    data,
  }
}

const registerUser = ({ email, login, password }) => (dispatch) => {
  fetch('/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login,
      email,
      password,
    })
  },
  {credentials: 'include'})
    .then(res => res.status === 200 ? res.json() : {})
    .then(data => {
      dispatch(signUpUser(data));
    })
}

//===============================

const showProfileThunk = () => {
  return async (dispatch) => {
    const response = await fetch('/user/tours', {credentials: 'include'});
    const result = await response.json();
    dispatch ({
      type: TYPES.SET_USERS_TOURS,
      data: result
    })
  }
}

const addTourThunk = (paramUser, paramTour) => async (dispatch) => {
  const response = await fetch(`/user/${paramUser}/addtour`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: paramTour })
  }, {credentials: 'include'});
  const result = await response.json();
  dispatch ({
    type: TYPES.ADD_TOUR,
    data: result
  })
}

const deleteTourThunk = (paramUser, paramTour) => async (dispatch) => {
  const response = await fetch(`/user/${paramUser}/deletetour`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: paramTour })
  }, {credentials: 'include'});
  dispatch ({
    type: TYPES.DELETE_TOUR,
    data: paramTour,
  })
  dispatch ({
    type: TYPES.CHANGE_IS_ADDED,
    data: paramTour
  })
}

export {
  checkUserSession,
  loginUser,
  logoutUser,
  registerUser,
  showProfileThunk,
  addTourThunk,
  deleteTourThunk,
  loginUserByGoogle,
}
