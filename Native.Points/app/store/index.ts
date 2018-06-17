import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './index.reducer';
import rootSaga from '../store/index.sagas';

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
    ),
);

sagaMiddleware.run(rootSaga)

export default store;

