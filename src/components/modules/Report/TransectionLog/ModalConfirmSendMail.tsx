/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Label, Modal } from "flowbite-react";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation-blue.svg";
import { MutableRefObject, useCallback } from "react";
import { CustomModalRef } from "@elements/CustomModal";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  itemKey?: string | number;
  value?: any;
  onSendEmail?: (data: any) => any;
};

const ModalConfirmSendMail = ({ modalRef, itemKey, onSendEmail }: Props) => {
  const handleOnSendEmail = useCallback(() => {
    onSendEmail && onSendEmail(itemKey);
    modalRef?.current?.onHide();
  }, [itemKey, modalRef, onSendEmail]);
  return (
    <>
      <Exclamation className="self-center" />
      <Modal.Body className="pt-6 justify-center text-center">
        <Label className="text-base text-center  text-gray-500">
          Are you sure you want to ‘Resend’ this transaction?
        </Label>
      </Modal.Body>
      <Modal.Footer className="border-t justify-center border-gray-200">
        <Button onClick={handleOnSendEmail} color="blue">
          Yes, I’m sure
        </Button>
        <Button onClick={modalRef?.current?.onHide} color="light">
          No, cancel
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalConfirmSendMail;
