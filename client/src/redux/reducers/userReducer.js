import * as TYPES from '../types/types';

function userReducer(user = {}, action) {
  switch (action.type) {
    case TYPES.CHECK_USER_SESSION:
      return action.data
    case TYPES.VERIFY_USER:
      return action.data
    case TYPES.LOGOUT_USER:
      return action.data
      case TYPES.SET_TOURS:
        return {...user, searchTours: action.data}
    case TYPES.SET_USERS_TOURS:
      return {...user, usersTours: action.data}
    case TYPES.ADD_TOUR:
      return {...user, usersTours: [...user.usersTours, action.data ]}
    case TYPES.DELETE_TOUR:
      return {...user, usersTours: user.usersTours.filter(el => el._id !== action.data)}
      case TYPES.CHANGE_IS_ADDED:
      return {...user, usersTours: user.usersTours.map(el => el._id === action.data ? {...el, isAdded: !el.isAdded} : el)}

    default:
      return user;
  }
}

export default userReducer;
