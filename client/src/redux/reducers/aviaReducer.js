import * as TYPES from '../types/types';

function aviaReducer(avia = [], action) {
  switch (action.type) {
    case TYPES.SET_AVIA_FROM_BD:
      return action.data
    case TYPES.FILTER_AVIA_BY_PRICE:
      return action.data
    case TYPES.SET_SORTED_AVIA:
      return action.data
    case TYPES.CHANGE_IS_ADDED_AVIA:
      return avia.map(el => el._id === action.data ? { ...el, isAdded: !el.isAdded } : el)
    default:
      return avia;
  }
}

export default aviaReducer;
