import "./App.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getNavRouteByAccountType, PATH } from "./helper/navHelper";
import { useLoginHook } from "./hook/loginHook";
import { useEffect } from "react";

const App = ({ username, accountType }) => {
  const navigate = useNavigate();

  const isLoggedIn = useLoginHook(username);
  useEffect(() => {
    if (isLoggedIn) {
      navigate(getNavRouteByAccountType(accountType), {
        replace: true,
      });
    } else {
      navigate(PATH.login, {
        replace: true,
      });
    }
  }, []);
  return <div className="App"></div>;
};

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    accountType: state.login.accountType,
  };
};

const AppPage = connect(mapStateToProps, null)(App);

export default AppPage;
