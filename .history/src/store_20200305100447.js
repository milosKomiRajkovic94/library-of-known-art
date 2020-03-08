import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-react';

import rootReducer from './reducers';

import initialState from './initialState';

import logger from 'redux-logger';

export default function configureStore(){
    return createStore(
        rootReducer,
        process.env.NODE_ENV === 'production' && window.devToolsExtension ?
        applyMiddleware(thunk)
        :
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
}