import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNavRouteByAccountType } from "../helper/navHelper";
import { useLoginHook } from "../hook/loginHook";
import { login } from "../redux/actions/loginAction";
import { imageMap } from "../helper/imageHelper";
import Loading from "../components/Loading";

interface LoginProps {
  login: Function;
  username: string;
  accountType: string;
  loading: boolean;
}

const Login = (props: LoginProps) => {
  const { login, username, accountType, loading } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(username);

  if (isLoggedIn) {
    navigate(getNavRouteByAccountType(accountType), {
      replace: true,
    });
  }

  return (
    <div className="p-10 flex flex-col flex-1 h-full items-center">
      <Loading isLoading={loading} />
      <div className="w-96 bg-bgPurple p-10 rounded-md">
        <div className="flex flex-row justify-center">
          <img src={imageMap.certLogo} className="w-12 h-12" />
        </div>
        <p className="flex justify-center mt-4 mb-8 text-2xl tx-textDarkGrey">
          E-Certificate Portal
        </p>
        <p className="flex my-2 text-xs tx-textGrey">Username</p>
        <input
          title="username"
          placeholder="Username"
          className="flex flex-1 rounded-md p-3 my-2 w-full"
          onChange={(e: any) => {
            setUsernameInput(e.target.value);
          }}
        />

        <p className="flex my-2 text-xs tx-textGrey">Password</p>
        <input
          title="password"
          placeholder="Password"
          className="flex flex-1 rounded-md p-3 my-2 w-full"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              login(usernameInput);
            }
          }}
        />

        <input
          type="button"
          value={"Login"}
          className="flex rounded-md p-3 my-4 bg-slate-400 w-full text-white text-xl justify-center"
          onClick={() => {
            login(usernameInput);
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

const mapStateToProps = (state: any) => {
  return {
    username: state.login.username,
    accountType: state.login.accountType,
    loading: state.login.loading,
  };
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginPage;
