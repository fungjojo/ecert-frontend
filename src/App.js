import "./App.css";
import { useNavigate } from "react-router-dom";
import { getNavRouteByAccountType, PATH } from "./helper/navHelper";
import { useSelector } from "react-redux";
import { useLoginHook } from "./hook/loginHook";
import { useEffect } from "react";

const App = () => {
  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();

  const isLoggedIn = useLoginHook(loginState.username);
  useEffect(() => {
    if (isLoggedIn) {
      navigate(getNavRouteByAccountType(loginState.accountType), {
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

export default App;
