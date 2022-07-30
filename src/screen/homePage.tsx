import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CertificateTemplate from "../components/CertificateTemplate";
import Header from "../components/Header";
import { imageMap } from "../helper/imageHelper";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { getCertificate } from "../redux/actions/certAction";
import { useEffect, useState } from "react";
import TableView from "../components/TableView";
import { certObject } from "../dataModel/dataTypes";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import html2canvas from "html2canvas";

interface HomeProps {
  logout: Function;
  getCertificate: Function;
  username: string;
  certList: any[];
  loading: boolean;
}

const Home = (props: HomeProps) => {
  const { logout, getCertificate, username, certList, loading } = props || {};

  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(username);
  const tableTitleList = [
    { item: "Id", className: "w-50" },
    { item: "Cert Object", className: "w-700" },
    { item: "Last Updated At", className: "" },
    { item: "Txn Id", className: "" },
    { item: "Action", className: "" },
  ];
  const [certDataList, setCertDataList] = useState<any>([]);
  const [showCert, setShowCert] = useState<boolean>(false);
  const [templateCertData, setTemplateCertData] = useState<any>(null);

  if (!isLoggedIn) {
    navigate("/login", {
      replace: true,
    });
  }

  useEffect(() => {
    getCertificate();
  }, []);

  useEffect(() => {
    if (certList) {
      // {id: 24, certDataString: 'sample', lastUpdatedAt: '2022-07-23T15:21:15Z', nonce: 11, userId: '001', …}
      const formattedCertList = certList.map((certData: certObject) => {
        const { id, certDataString, lastUpdatedAt, txnId } = certData;
        return [
          { item: id, className: "text-center w-50" },
          { item: certDataString, className: "w-700" },
          { item: lastUpdatedAt },
          { item: txnId },
          {
            item: txnId,
            type: "button",
            contentView: (
              <input
                type="button"
                value="View"
                className="flex flex-1 bg-slate-400 rounded-md p-3 my-2 w-1/4 text-white text-xl justify-center"
                onClick={() => {
                  const { content } =
                    (certDataString && JSON.parse(certDataString)) || {};
                  setShowCert(true);
                  setTemplateCertData(content);
                }}
              />
            ),
          },
        ];
      });
      setCertDataList(formattedCertList);
    }
  }, [certList]);

  const downloadCert = () => {
    const doc: any = document.querySelector("#capture");
    if (doc) {
      html2canvas(doc).then((canvas) => {
        const element = document.createElement("a");
        element.href = canvas.toDataURL("image/png");
        element.download = "cert.png";
        element.click();
      });
    }
  };

  return (
    <>
      {showCert && (
        <Modal
          closeModal={() => {
            setShowCert(false);
            setTemplateCertData(null);
          }}
        >
          <div className="self-center p-8">
            <CertificateTemplate certData={templateCertData} />
            <input
              type="button"
              value="Download Cert (.json)"
              className="flex flex-1 bg-slate-400 rounded-md p-3 my-2 w-1/3 text-white text-xl justify-center"
              onClick={() => {
                downloadCert();
              }}
            />
          </div>
        </Modal>
      )}

      <div className="">
        <Loading isLoading={loading} />
        <Header headerTitle="Home" logout={logout} iconSrc={imageMap.home} />
        <div
          className={`bg-bgGrey p-10 flex flex-col h-full ${
            showCert && "fixed"
          }`}
        >
          <p className="tx-bgGrey text-xl mb-8">{"List of records"}</p>
          <div className="flex">
            <TableView
              tableClassName="w-1500 table-fixed"
              colNameList={tableTitleList}
              colItemList={certDataList}
            />
          </div>
        </div>
      </div>
    </>
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
    loading: state.cert.loading,
  };
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomePage;
