import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Certificate } from "@blockcerts/cert-verifier-js";
import { useLoginHook } from "../hook/loginHook";
import { logout } from "../redux/actions/loginAction";
import { LoginStateProps } from "../redux/reducers/loginReducer";
import dummyCert from "../dummy/test-blockertv2.json";
import Header from "../components/Header";

interface VerifyProps {
  logout: Function;
}

const Verify = (props: VerifyProps) => {
  const { logout } = props || {};
  const loginState = useSelector<any, LoginStateProps>((state) => state.login);
  const navigate = useNavigate();
  const isLoggedIn = useLoginHook(loginState.username);

  const [cert, setCert] = useState<any>(dummyCert);
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

  //   TODO: upload cert here
  return (
    <div className="bg-bgPurple p-10 flex flex-col">
      <Header
        headerTitle="Verify Certificate"
        logout={() => {
          logout();
        }}
      />

      <input
        type="button"
        value={"Upload New Cert For Verification"}
        className="flex rounded-md p-3 my-4 text-xs bg-amber-400 w-1/3 text-white text-xl justify-center"
        onClick={() => {
          verifyCert(cert);
        }}
      />
      <input
        type="button"
        value={"Verify"}
        className="flex rounded-md p-3 my-4 text-xs bg-slate-400 w-1/3 text-white text-xl justify-center"
        onClick={() => {
          verifyCert(cert);
        }}
      />

      <p>{"Cert Data:"}</p>
      <p>{cert.id}</p>
      <p>{cert.issuedOn}</p>
      <p>{cert.recipient.identity}</p>
      <p className="text-red-700">{"Result"}</p>
      <p>{`Response Status: ${certResp?.status || ""}`}</p>
      <p>{`Response Message: ${certResp?.message || ""}`}</p>
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

const VerifyPage = connect(null, mapDispatchToProps)(Verify);

export default VerifyPage;
