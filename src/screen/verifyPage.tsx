import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Certificate } from "@blockcerts/cert-verifier-js";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";
import dummyCert from "../dummy/test-blockertv2.json";
import Header from "../components/Header";
import TableView from "../components/TableView";
import { imageMap } from "../helper/imageHelper";
import Loading from "../components/Loading";

interface VerifyProps {
  logout: Function;
  loading: boolean;
}

const Verify = (props: VerifyProps) => {
  const { logout, loading } = props || {};
  const loginState = useSelector<any, LoginStateProps>((state) => state.login);
  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(loginState.username);

  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<any>("-");
  const [certResp, setCertResp] = useState<any>();

  if (!isLoggedIn) {
    navigate("/login", {
      replace: true,
    });
  }

  const verifyCert = async (certificateDefinition: any) => {
    // init cert
    const certificate = new Certificate(certificateDefinition);
    await certificate.init();

    // verify cert
    const verificationResult = await certificate.verify(
      ({ code, label, status, errorMessage }) => {
        console.log("Code:", code, label, " - Status:", status);
        if (errorMessage) {
          console.log(`The step ${code} fails with the error: ${errorMessage}`);
        }
      }
    );

    console.log("??? verify cert 4", verificationResult);
    setCertResp(verificationResult);
    if (verificationResult.status === "failure") {
      console.log(
        `The certificate is not valid. Error: ${verificationResult.message}`
      );
    }
  };

  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileJson = await new Response(file).json();
    setFileName(file?.name);
    setFile(fileJson);
  };

  return (
    <div className="flex flex-col h-full">
      <Loading isLoading={loading} />
      <Header
        headerTitle="Verify Certificate"
        logout={() => {
          logout();
        }}
        iconSrc={imageMap.verifyFile}
      />
      <div className="bg-bgGrey p-10 flex flex-col h-full">
        <div className="flex flex-row content-center">
          <p>{`File Chosen: ${fileName}`}</p>
          <input
            type="button"
            value={"Use dummy"}
            className="flex rounded-md p-2 ml-2 text-xs bg-slate-400 w-15 text-white justify-center"
            onClick={() => {
              setFile(dummyCert);
              setFileName("DummyCert.json");
            }}
          />
        </div>
        <div>
          <p>{"Cert Data:"}</p>
          <TableView
            colNameList={[
              { item: "Id" },
              { item: "Issued On" },
              { item: "Identity" },
            ]}
            colItemList={
              (file && [
                [
                  { item: file.id || "" },
                  { item: file.issuanceDate || "" },
                  { item: file.recipient?.identity || "" },
                ],
              ]) ||
              []
            }
          />
          <p className="text-red-700">{"Result"}</p>
          <p>{`Response Status: ${certResp?.status || ""}`}</p>
          <p>{`Response Message: ${certResp?.message || "-"}`}</p>
        </div>

        <div className="flex flex-row">
          <label
            htmlFor="file-upload"
            className="flex flex-1 rounded-md p-3 my-4 mr-4 text-s bg-slate-400 w-1/3 text-white justify-center"
          >
            Upload New Cert For Verification
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
          <input
            type="button"
            value={"Verify Certificate"}
            className="flex flex-1 rounded-md p-3 my-4 text-s bg-amber-400 w-1/3 text-white justify-center"
            onClick={() => {
              verifyCert(file);
            }}
          />
        </div>
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

const mapStateToProps = (state: any) => {
  return {
    loading: state.cert.loading,
  };
};
const VerifyPage = connect(mapStateToProps, mapDispatchToProps)(Verify);

export default VerifyPage;
