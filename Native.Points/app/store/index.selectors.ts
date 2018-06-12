import { createSelector } from "reselect";
import * as fromLogin from '../auth/reducers';
import { BaseState } from "./index.reducer";
import { store } from "./";

function select(state: BaseState<fromLogin.LoginState>) {
  return state;
}

let currentValue: any;
export function handleChange(callback: (state: BaseState<any>) => void) {
  let previousValue = currentValue
  currentValue = select(store.getState())

  if (previousValue !== currentValue) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      currentValue
    )
  }
  return callback(currentValue);
}

// const unsubscribe = store.subscribe(handleChange)