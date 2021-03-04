import * as TYPES from '../types/types';

function userReducer(user = {}, action) {
  switch (action.type) {
    case TYPES.CHECK_USER_SESSION:
      return action.data
    case TYPES.VERIFY_USER:
      return action.data
    case TYPES.LOGOUT_USER:
      return {}
    default:
      return user;
  }
}

export default userReducer;
