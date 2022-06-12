import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/index";
// import { myCustomApiService } from "./api";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        // extraArgument: myCustomApiService,
      },
    }),
});

export default store;
// // later
// function fetchUser(id) {
//   // The `extraArgument` is the third arg for thunk functions
//   return (dispatch, getState, api) => {
//     // you can use api here
//   };
// }
