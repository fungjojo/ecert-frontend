import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { issueCertificate, clearCertAction } from "../redux/actions/certAction";
import dummyCert from "../dummy/test-blockertv2.json";
import Header from "../components/Header";
import { imageMap } from "../helper/imageHelper";
import Loading from "../components/Loading";

interface VerifyProps {
  logout: Function;
  issueCertificate: Function;
  username: string;
  signedCert: any;
  certError: string;
  loading: boolean;
  clearCertAction: Function;
}

const Verify = (props: VerifyProps) => {
  const {
    loading,
    logout,
    issueCertificate,
    username,
    signedCert,
    certError,
    clearCertAction,
  } = props || {};
  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(username);

  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<any>("-");
  const [studentId, setStudentId] = useState<string>("");

  if (!isLoggedIn) {
    navigate("/login", {
      replace: true,
    });
  }

  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileJson = await new Response(file).json();
    setFileName(file?.name);
    setFile(fileJson);
  };

  const downloadSignedCert = async () => {
    const element = document.createElement("a");
    const blobFile = new Blob([JSON.stringify(signedCert)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(blobFile);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="flex flex-col h-full">
      <Loading isLoading={loading} />
      <Header
        headerTitle="Issue Certificate"
        logout={() => {
          logout();
        }}
        iconSrc={imageMap.verifyFile}
      />
      <div className="bg-bgGrey p-10 flex flex-col h-full">
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
            value={"Issue Certificate"}
            className="flex flex-1 rounded-md p-3 my-4 mr-4 text-s bg-amber-400 w-1/3 text-white justify-center"
            onClick={() => {
              if (!file) {
                alert("Please upload your certificate first!");
                return;
              }
              if (!studentId) {
                alert("Please input student ID first!");
                return;
              }

              issueCertificate(studentId, JSON.stringify(file));
            }}
          />
          <input id="myInput" className="hidden" />
        </div>
        <div className="flex flex-row content-center item-center mb-5">
          <p className="text-xs tx-textGrey mr-8">Issue Cert For</p>
          <input
            title="stuent_id"
            placeholder="Student Id"
            className="flex rounded-md p-2 my-2 w-1/4"
            onChange={(e: any) => {
              setStudentId(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center">
          <p className="tx-bgGrey text-xl self-center">{`File Name: ${fileName}`}</p>
          <input
            type="button"
            value={"Use dummy"}
            className="flex rounded-md p-2 ml-2 text-xs bg-slate-400 w-15 text-white justify-center"
            onClick={() => {
              setFile(dummyCert);
              setFileName("DummyCert.json");
            }}
          />
          <input
            type="button"
            value={"Clear file"}
            className="flex rounded-md p-2 ml-2 text-xs bg-slate-400 w-15 text-white justify-center"
            onClick={() => {
              setFile(null);
              setFileName("-");
              clearCertAction();
            }}
          />
        </div>
        <div>
          {!!file && <p className="tx-bgGrey text-xl">{"File Content:"}</p>}
          <p>{!!file && JSON.stringify(file)}</p>
          {!loading && !!file && (
            <>
              <p
                className={`text-xl ${
                  !certError ? "text-green-700" : "text-red-700"
                }`}
              >
                {signedCert && `Response ${!certError ? "Success" : "Failed"}`}
              </p>
              <p>{signedCert && JSON.stringify(signedCert)}</p>
            </>
          )}
        </div>

        <input
          type="button"
          disabled={!signedCert || !!certError}
          value={"Download Signed Certificate"}
          className={`flex rounded-md p-3 my-2 text-s w-1/4 text-white justify-center ${
            signedCert && !certError ? "bg-btnGreen" : "bg-disableGrey"
          }`}
          onClick={() => {
            downloadSignedCert();
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
    clearCertAction: () => {
      dispatch(clearCertAction());
    },
    issueCertificate: (studentId: string, certDataString: string) => {
      dispatch(issueCertificate(studentId, certDataString));
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    username: state.login.username,
    signedCert: state.cert.signedCert,
    certError: state.cert.certError,
    loading: state.cert.loading,
  };
};

const VerifyPage = connect(mapStateToProps, mapDispatchToProps)(Verify);

export default VerifyPage;
