import { imageMap } from "../helper/imageHelper";

interface ModalProps {
  children: any;
  closeModal?: Function;
}

const Modal = (props: ModalProps) => {
  const { children, closeModal } = props || {};
  return (
    <div className="absolute w-full h-full">
      <img
        src={imageMap.close}
        className="absolute w-8 h-8 z-50 top-10 left-10 bg-white"
        onClick={() => {
          closeModal && closeModal();
        }}
      />
      <div className="absolute w-full z-40 flex flex-col">{children}</div>
      <div className="absolute w-full h-full bg-black z-10 opacity-50"></div>
    </div>
  );
};

export default Modal;
