import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./types";
import { makeActionCreator } from "../reduxHelper";
import { UserSession } from "../../hook/loginHook";
import { RootStateProps } from "../reducers";
import { loginSessionLimit } from "../../dataModel/constants";
import moment from "moment";

const loginAction = makeActionCreator(LOGIN, "username");
const loginSuccessAction = makeActionCreator(LOGIN_SUCCESS, "username");
const loginFailAction = makeActionCreator(LOGIN_FAIL);

// function login() {
//   return (dispatch) => {
//     setTimeout(() => {
//       // Yay! Can invoke sync or async actions with `dispatch`
//       dispatch(increment());
//     }, 1000);
//   };
// }

// api calls

// export const addTodo = ({ title, userId }) => {
//   return (dispatch) => {
//     dispatch(addTodoStarted());

//     axios
//       .post(`https://jsonplaceholder.typicode.com/todos`, {
//         title,
//         userId,
//         completed: false,
//       })
//       .then((res) => {
//         dispatch(addTodoSuccess(res.data));
//       })
//       .catch((err) => {
//         dispatch(addTodoFailure(err.message));
//       });
//   };
// };

// const login = (dispatch, state) => {
//   console.log("???? login action", username, state);
//   dispatch({ type: LOGIN });
//   dispatch({ type: LOGIN_SUCCESS });
//   // Return promise with success and failure actions
//   // return axios.get("/api/auth/user").then(
//   //   (user) => dispatch({ type: GET_CURRENT_USER_SUCCESS, user }),
//   //   (err) => dispatch({ type: GET_CURRENT_USER_FAILURE, err })
//   // );
// };
const login = (username: string) => {
  console.log("???? login action username", username);
  return (dispatch: any, getState: () => RootStateProps) => {
    console.log("???? login action");
    console.log("???? login state", getState());
    // dispatch(loginAction);
    // dispatch(loginSuccessAction);
    dispatch({ type: LOGIN });
    const currentDate = moment().toDate();
    const expiry = moment().add(loginSessionLimit, "seconds").toDate();
    const userObject: UserSession = {
      timestamp: currentDate,
      expiry: expiry,
    };
    console.log("???? login userObject", userObject);
    window.sessionStorage.setItem(username, JSON.stringify(userObject));
    dispatch(loginSuccessAction(username));
    return;
    // Return promise with success and failure actions
    // return axios.get("/api/auth/user").then(
    //   (user) => dispatch({ type: GET_CURRENT_USER_SUCCESS, user }),
    //   (err) => dispatch({ type: GET_CURRENT_USER_FAILURE, err })
    // );
  };
};

export { login, loginAction };
