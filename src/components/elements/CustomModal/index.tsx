/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "flowbite-react";
import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
export type CustomModalRef = {
  onShow: () => void;
  onHide: () => void;
};
export type CustomModalProps = PropsWithChildren;

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>(
  ({ children }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const onShow = () => setOpen(true);
    const onHide = () => setOpen(false);
    const actions = {
      onShow,
      onHide,
    };
    useImperativeHandle(ref, () => actions, []);
    return (
      <Modal
        size="3xl"
        onClose={() => setOpen(false)}
        show={isOpen}
        dismissible
        popup
      >
        {children}
      </Modal>
    );
  }
);

export default CustomModal;
