import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    ),
);
