import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./types";
import { makeActionCreator } from "../reduxHelper";
import { UserSession } from "../../hook/loginHook";
import { RootStateProps } from "../reducers";
import { loginSessionLimit } from "../../dataModel/constants";
import moment from "moment";

const loginAction = makeActionCreator(LOGIN, "username");
const loginSuccessAction = makeActionCreator(LOGIN_SUCCESS, "username");
const loginFailAction = makeActionCreator(LOGIN_FAIL);
const logoutAction = makeActionCreator(LOGOUT);

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

const login = (username: string) => {
  console.log("???? login action username", username);
  return (dispatch: any, getState: () => RootStateProps) => {
    dispatch(loginAction());
    const currentDate = moment().toDate();
    const expiry = moment().add(loginSessionLimit, "seconds").toDate();
    const userObject: UserSession = {
      timestamp: currentDate,
      expiry: expiry,
    };
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

const logout = () => {
  return (dispatch: any, getState: () => RootStateProps) => {
    const { username } = getState()?.login || {};
    window.sessionStorage.removeItem(username);
    dispatch(logoutAction());
  };
};

export { login, logout, loginAction };
