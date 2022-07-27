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

const login = (username: string) => {
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
