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
    <div className="bg-bgPurple p-10 flex flex-col">
      <p className="flex justify-center my-8 text-lg">Login Page</p>
      <div className="">
        <p className="flex my-2 text-xs text-textGrey">Username</p>
        <input
          title="username"
          placeholder="username"
          className="flex flex-1 rounded-md p-1 my-2"
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
        />
      </div>

      <div className="">
        <p className="flex my-2 text-xs text-textGrey">Password</p>
        <input
          title="password"
          placeholder="password"
          className="flex flex-1 rounded-md p-1 my-2"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        className="flex flex-1 rounded-md p-1 my-2 text-xs h-10 bg-black"
        title="Login"
        onClick={() => {
          login(username);
        }}
      />
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
