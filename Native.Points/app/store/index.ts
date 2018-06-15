import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './index.reducer';
import { LoginState } from '../auth/reducers';
import rootSaga from '../auth/sagas';

import loginReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';
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

sagaMiddleware.run(rootSaga)

export * from './index.reducer';
export * from './index.selectors';
