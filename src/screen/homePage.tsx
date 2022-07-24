import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CertificateTemplate from "../components/CertificateTemplate";
import Header from "../components/Header";
import { imageMap } from "../helper/imageHelper";
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

  const downloadCert = () => {};

  //   TODO: upload cert here
  return (
    <div className="">
      <Header
        headerTitle="Home"
        logout={() => {
          logout();
        }}
        iconSrc={imageMap.home}
      />
      <div className="bg-bgGrey p-10 flex flex-col h-full">
        <CertificateTemplate />
        <input
          type="button"
          value="Download Cert (csv)"
          className="flex flex-1 bg-slate-400 rounded-md p-3 my-2 w-1/4 text-white text-xl justify-center"
          onClick={() => {
            downloadCert();
          }}
        />
      </div>
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
