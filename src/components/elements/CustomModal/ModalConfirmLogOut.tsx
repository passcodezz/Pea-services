/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomModal, { CustomModalProps } from "@elements/CustomModal";
import classNames from "classnames";
import { FC, useCallback, useRef } from "react";
import { CustomModalRef } from "@elements/CustomModal";
import { Button, Label, Modal } from "flowbite-react";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation.svg";

type Props = {
  header?: string;
  modalProps?: CustomModalProps;
  onLogOut?: () => void;
} & CustomModalProps;

const ModalConfirmLogOut: FC<Props> = ({ header, modalProps, onLogOut }) => {
  const ref = useRef<CustomModalRef>(null);

  const handleOnClick = useCallback(() => {
    onLogOut && onLogOut();
    ref?.current?.onHide();
  }, [onLogOut]);

  const handleOnCanCle = useCallback(() => {
    ref?.current?.onHide();
  }, []);

  return (
    <>
      <div
        onClick={() => {
          ref.current?.onShow();
        }}
        className="text-gray-500"
      >
        Log Out
      </div>

      <CustomModal {...modalProps} ref={ref}>
        <Modal.Header
          className={classNames({
            "border-b border-gray-200 p-4 dark:border-gray-700": header,
          })}
        >
          {<strong>{header}</strong>}
        </Modal.Header>

        <Exclamation className="self-center" />
        <Modal.Body className="pt-6 justify-center text-center">
          <Label className="text-base text-center  text-gray-500">
            Are you sure you want to 'Logout' ?
          </Label>
        </Modal.Body>
        <Modal.Footer className="border-t justify-center border-gray-200">
          <Button onClick={handleOnClick} color="failure">
            Yes, I’m sure
          </Button>
          <Button onClick={handleOnCanCle} color="light">
            No, cancel
          </Button>
        </Modal.Footer>
      </CustomModal>
    </>
  );
};

export default ModalConfirmLogOut;
