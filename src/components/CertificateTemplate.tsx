import { templateModel } from "../dataModel/dataTypes";
import { imageMap } from "../helper/imageHelper";

interface CertificateTemplateProps {
  certData?: templateModel;
}

const dummyCert = {
  studentName: "Chan Tai Man",
  degreeNameEN: "Bachelor of Engineering",
  degreeNameZH: "工程學士",
  chancellor: "Chan Tai Man",
  registrar: "Chan Tai Man",
  viceChancellor: "Chan Tai Man",
};

const CertificateTemplate = (props: CertificateTemplateProps) => {
  const width = window.innerWidth * 0.7;
  const { certData = dummyCert } = props || {};
  const { studentName, degreeNameEN, degreeNameZH } = certData || {};
  return (
    <div
      className="flex flex-col p-5"
      style={{
        backgroundColor: "#f0e4d8",
        height: width / 0.7,
        width: width,
      }}
    >
      <div className="flex flex-1 flex-col content-center justify-center">
        <img src={imageMap.hkuLogo} className="w-24 h-24 self-center mb-3" />
        <p className="text-center">The University of Hong Kong</p>
        <p className="text-center">香港大學</p>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-center mb-5">{studentName}</p>
        <p className="text-center">
          has fulfilled all the requirements of the University and having
          satisfied the examiners
        </p>
        <p className="text-center mb-5">修畢課業考試及格</p>
        <p className="text-center">
          has this day been admitted to the degree of
        </p>
        <p className="text-center mb-5">謹授予學位</p>
        <p className="text-center">{degreeNameEN}</p>
        <p className="text-center mb-5">{degreeNameZH}</p>
        <p className="text-center">with Distinction</p>
        <p className="text-center">優異</p>
      </div>

      <div className="flex flex-1 flex-col justify-end align-end">
        <p className="text-end">Chancellor 校監</p>
        <div className="flex flex-row justify-end mt-20">
          <p>Register 教務長</p>
          <p>Vice-Chancellor 校長</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
