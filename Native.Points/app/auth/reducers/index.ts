// import { combineReducers } from "redux";

// import { DATA_AVAILABLE } from "../actions";

// type DataState = { data: object, loading: boolean };
// let dataState: DataState = { data: [], loading: true };

// const dataReducer = (state = dataState, action) => {
//     switch (action.type) {
//         case DATA_AVAILABLE:
//             state = Object.assign({}, state, { data: action.data, loading: false });
//             return state;
//         default:
//             return state;
//     }
// };

// const rootReducer = combineReducers({
//     dataReducer
//     // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
// });

// export default rootReducer;
