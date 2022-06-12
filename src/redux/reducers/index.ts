import { combineReducers } from "@reduxjs/toolkit";
import loginReducer, { LoginStateProps } from "./loginReducer";

export type RootStateProps = {
  login: LoginStateProps;
  // template: TemplateStateProps;
  // certificate: CertificateStateProps;
  // attribute: any;
  // user: UserStateProps;
};

export const rootReducer = combineReducers<RootStateProps>({
  login: loginReducer,
});
