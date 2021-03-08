import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tourReducer from './tourReducer';
const rootReducer = combineReducers({
    user: userReducer,
    allTours: tourReducer,
})

export default rootReducer
