import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import initState from './initState';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))


export default store;
