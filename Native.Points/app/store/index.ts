import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './index.reducer';
import { LoginState } from '../auth/reducers';

// export interface StoreState {
//     login: LoginState;
// }

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
    ),
);
