import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tourReducer from './tourReducer';
import aviaReducer from './aviaReducer';

const rootReducer = combineReducers({
    user: userReducer,
    allTours: tourReducer,
    avia: aviaReducer,
})

export default rootReducer
