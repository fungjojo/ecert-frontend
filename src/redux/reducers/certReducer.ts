import {
  GET_CERT,
  GET_CERT_FAIL,
  GET_CERT_SUCCESS,
  ISSUE_CERT,
  ISSUE_CERT_SUCCESS,
  ISSUE_CERT_FAIL,
  CLEAR_CERT,
} from "../actions/types";

export type CertStateProps = {
  loading: boolean;
  certList: any[];
  signedCert: any;
};

const initialState: CertStateProps = {
  loading: false,
  certList: [],
  signedCert: null,
};

const certReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CERT:
      return {
        ...state,
        loading: true,
      };
    case GET_CERT_SUCCESS:
      return {
        ...state,
        loading: false,
        certList: action.data,
      };
    case GET_CERT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ISSUE_CERT:
      return {
        ...state,
        loading: true,
        signedCert: null,
        certError: "",
      };
    case ISSUE_CERT_SUCCESS:
      return {
        ...state,
        loading: false,
        signedCert: action.data,
      };
    case ISSUE_CERT_FAIL:
      const { response } = action.error || {};
      return {
        ...state,
        loading: false,
        signedCert: response,
        certError: response?.data?.error || "Issue certificate Failed",
      };
    case CLEAR_CERT:
      return {
        ...state,
        signedCert: null,
        certError: "",
      };
    default:
      return state;
  }
};

export default certReducer;
