import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

export type LoginStateProps = {
  loading: boolean;
  username: string;
  loginSuccess: boolean;
  // userRole: string,
};

const initialState: LoginStateProps = {
  loading: false,
  username: "",
  loginSuccess: false,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      console.log("??? action: LOGIN_SUCCESS", action);
      return {
        ...state,
        loading: false,
        username: action.username,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default loginReducer;
