import * as TYPES from '../types/types';

function aviaReducer(avia = [], action) {
  switch (action.type) {
      case TYPES.SET_AVIA_FROM_BD:
        return action.data    
        case TYPES.FILTER_AVIA_BY_PRICE:
          return action.data
          case TYPES.SET_SORTED_AVIA:
            return action.data
    default:
      return avia;
  }
}

export default aviaReducer;
