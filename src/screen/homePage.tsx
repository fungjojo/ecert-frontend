import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CertificateTemplate from "../components/CertificateTemplate";
import Header from "../components/Header";
import { imageMap } from "../helper/imageHelper";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { getCertificate } from "../redux/actions/certAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";
import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import { CertStateProps } from "../redux/reducers/certReducer";
import { certObject } from "../dataModel/dataTypes";

interface HomeProps {
  logout: Function;
  getCertificate: Function;
  username: string;
  certList: any[];
}

const Home = (props: HomeProps) => {
  const { logout, getCertificate, username, certList } = props || {};

  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(username);
  const tableTitleList = ["Id", "Cert Object", "Last Updated At", "Txn Id"];
  const [certDataList, setCertDataList] = useState<any>([]);

  if (!isLoggedIn) {
    navigate("/login", {
      replace: true,
    });
  }

  useEffect(() => {
    console.log("??? get certificate");
    getCertificate();
  }, []);

  useEffect(() => {
    if (certList) {
      // {id: 24, certDataString: 'sample', lastUpdatedAt: '2022-07-23T15:21:15Z', nonce: 11, userId: '001', …}
      console.log("??? certList", certList);
      const formattedCertList = certList.map((certData: certObject) => {
        const { id, certDataString, lastUpdatedAt, txnId } = certData;
        return [id, certDataString, lastUpdatedAt, txnId];
      });
      console.log("??? formattedCertList", formattedCertList);
      setCertDataList(formattedCertList);
    }
  }, [certList]);

  const downloadCert = () => {};
  console.log("?? home render");

  //   TODO: upload cert here
  return (
    <div className="">
      <Header headerTitle="Home" logout={logout} iconSrc={imageMap.home} />
      <div className="bg-bgGrey p-10 flex flex-col h-full">
        <div className="flex w-1/2">
          <TableView colNameList={tableTitleList} colItemList={certDataList} />
        </div>
        <CertificateTemplate />
        <input
          type="button"
          value="Download Cert (.json)"
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
    getCertificate: () => {
      dispatch(getCertificate());
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    username: state.login.username,
    accountType: state.login.accountType,
    certList: state.cert.certList,
  };
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomePage;
