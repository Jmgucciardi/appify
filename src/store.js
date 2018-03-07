import reducer from './reducers';
import {createStore, applyMiddleware,} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {};

export const initStore = () => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
}