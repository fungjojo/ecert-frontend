import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";

interface HomeProps {
  logout: Function;
}

const Home = (props: HomeProps) => {
  const { logout } = props || {};
  const loginState = useSelector<any, LoginStateProps>((state) => state.login);
  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(loginState.username);

  if (!isLoggedIn) {
    navigate("/login", {
      replace: true,
    });
  }

  //   TODO: upload cert here
  return (
    <div className="bg-bgPurple p-10 flex flex-col h-full">
      <Header
        headerTitle="Home"
        logout={() => {
          logout();
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

const HomePage = connect(null, mapDispatchToProps)(Home);

export default HomePage;
