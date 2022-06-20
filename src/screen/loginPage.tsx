import { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNavRouteByAccountType } from "../helper/navHelper";
import { useLoginHook } from "../hook/loginHook";
import { login } from "../redux/actions/loginAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";

interface LoginProps {
  login: Function;
}

const Login = (props: LoginProps) => {
  const { login } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector<any, LoginStateProps>((state) => state.login);

  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(loginState.username);

  if (isLoggedIn) {
    navigate(getNavRouteByAccountType(loginState.accountType), {
      replace: true,
    });
  }

  return (
    <div className="bg-bgPurple p-10 flex flex-col flex-1 items-center">
      <div className="w-1/3 ">
        <p className="flex justify-center my-8 text-2xl">Login</p>
        <p className="flex my-2 text-xs text-textGrey">Username</p>
        <input
          title="username"
          placeholder="username"
          className="flex flex-1 rounded-md p-3 my-2 w-full"
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
        />

        <p className="flex my-2 text-xs text-textGrey">Password</p>
        <input
          title="password"
          placeholder="password"
          className="flex flex-1 rounded-md p-3 my-2 w-full"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              login(username);
            }
          }}
        />

        <input
          type="button"
          value={"login"}
          className="flex rounded-md p-3 my-4 text-xs bg-slate-400 w-full text-white text-xl justify-center"
          onClick={() => {
            login(username);
          }}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (username: string) => {
      dispatch(login(username));
    },
  };
};

const LoginPage = connect(null, mapDispatchToProps)(Login);

export default LoginPage;
