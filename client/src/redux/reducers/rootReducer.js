import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tourReducer from './tourReducer';
import priceReducer from './priceReducer';

const rootReducer = combineReducers({
    user: userReducer,
    allTours: tourReducer,
    priceTours: priceReducer,

})

export default rootReducer
