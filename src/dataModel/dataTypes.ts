export interface user {}

export interface templateModel {
  studentName: string;
  degreeNameEN: string;
  degreeNameZH: string;
  chancellor: string;
  registrar: string;
  viceChancellor: string;
}

export interface fileModel {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  //   lastModified: 1658674136683
  // lastModifiedDate: Sun Jul 24 2022 22:48:56 GMT+0800 (Hong Kong Standard Time) {}
  // name: "signed-cert.json"
  // size: 982
  // type: "application/json"
  // webkitRelativePath: ""
}
