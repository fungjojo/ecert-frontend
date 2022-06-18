import { AccountType } from "../../dataModel/constants";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

export type LoginStateProps = {
  loading: boolean;
  username: string;
  loginSuccess: boolean;
  accountType: string;
};

const initialState: LoginStateProps = {
  loading: false,
  username: "",
  loginSuccess: false,
  accountType: AccountType.student,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      const name = action.username;
      return {
        ...state,
        loading: false,
        username: name,
        accountType: name.includes("company")
          ? AccountType.company
          : name.includes("uni")
          ? AccountType.uni
          : AccountType.student,
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
