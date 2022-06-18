import { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNavRouteByAccountType } from "../helper/navHelper";
import { useLoginHook } from "../hook/loginHook";
import { login } from "../redux/actions/loginAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";

interface VerifyProps {}

const Verify = (props: VerifyProps) => {
  const {} = props || {};
  const loginState = useSelector<any, LoginStateProps>((state) => state.login);
  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(loginState.username);

  if (isLoggedIn) {
    navigate(getNavRouteByAccountType(loginState.accountType), {
      replace: true,
    });
  }

  //   TODO: upload cert here
  return (
    <div className="bg-bgPurple p-10 flex flex-col">
      <p className="flex justify-center my-8 text-lg">Verify Page</p>
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

const VerifyPage = connect(null, mapDispatchToProps)(Verify);

export default VerifyPage;
