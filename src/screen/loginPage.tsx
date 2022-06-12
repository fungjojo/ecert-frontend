import { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  console.log("??? loginState", loginState);
  console.log("??? isLoggedIn", isLoggedIn);

  // useEffect(() => {
  if (isLoggedIn) {
    navigate("/", { replace: true });
  }
  // }, [isLoggedIn]);

  return (
    <div>
      <p>Login Page</p>
      <input
        title="username"
        placeholder="username"
        onChange={(e: any) => {
          console.log("??? username", e.target.value);
          setUsername(e.target.value);
        }}
      />
      <input
        title="password"
        placeholder="password"
        onChange={(e: any) => {
          console.log("??? pw", e.target.value);
          setPassword(e.target.value);
        }}
      />
      <button
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
