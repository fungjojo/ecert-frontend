import {
  GET_CERT,
  GET_CERT_FAIL,
  GET_CERT_SUCCESS,
  ISSUE_CERT,
  ISSUE_CERT_SUCCESS,
  ISSUE_CERT_FAIL,
} from "./types";
import { makeActionCreator } from "../reduxHelper";
import { RootStateProps } from "../reducers";
import axios from "axios";
import moment from "moment";

const getCertAction = makeActionCreator(GET_CERT);
const getCertSuccessAction = makeActionCreator(GET_CERT_SUCCESS, "data");
const getCertFailAction = makeActionCreator(GET_CERT_FAIL);
const issueCertAction = makeActionCreator(ISSUE_CERT);
const issueCertSuccessAction = makeActionCreator(ISSUE_CERT_SUCCESS, "data");
const issueCertFailAction = makeActionCreator(ISSUE_CERT_FAIL, "error");

// api calls
const getCertificate = () => {
  return (dispatch: any, getState: () => RootStateProps) => {
    const { username } = getState()?.login;
    dispatch(getCertAction());
    const url = `http://107.20.26.70/api/certs/?userId=${username}`;
    axios.get(url).then(
      (resp) => {
        console.log("??? resp", resp);
        const { status, data } = resp || {};
        if (status === 200) {
          return dispatch(getCertSuccessAction(data));
        }
        dispatch({ type: GET_CERT_FAIL, errorCode: status });
      },
      (err) => dispatch({ type: GET_CERT_FAIL, err })
    );
  };
};

const issueCertificate = (certDataString: string) => {
  return (dispatch: any, getState: () => RootStateProps) => {
    const { username } = getState()?.login;
    dispatch(issueCertAction());
    const url = `http://107.20.26.70/api/certs/`;
    const bodyFormData = new FormData();
    bodyFormData.append("certDataString", certDataString);
    bodyFormData.append("lastUpdatedAt", moment().toISOString());
    bodyFormData.append("userId", username);

    console.log("??? lastUpdatedAt", moment().toISOString());
    console.log("??? username", username);
    console.log("??? post certDataString=", certDataString);
    if (!username || !certDataString) {
      return dispatch(issueCertFailAction("missing param"));
    }
    axios.post(url, bodyFormData, { timeout: 60000 }).then(
      (resp) => {
        const { status, data } = resp || {};
        if (status === 200) {
          return dispatch(issueCertSuccessAction(data));
        }
        dispatch(issueCertFailAction(status));
      },
      (err) => dispatch(issueCertFailAction(err))
    );
  };
};

export { getCertificate, issueCertificate, getCertAction };
