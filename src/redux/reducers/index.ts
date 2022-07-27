import { combineReducers } from "@reduxjs/toolkit";
import loginReducer, { LoginStateProps } from "./loginReducer";
import certReducer, { CertStateProps } from "./certReducer";

export type RootStateProps = {
  login: LoginStateProps;
  cert: CertStateProps;
  // template: TemplateStateProps;
  // certificate: CertificateStateProps;
  // attribute: any;
  // user: UserStateProps;
};

export const rootReducer = combineReducers<RootStateProps>({
  login: loginReducer,
  cert: certReducer,
});
