/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomModalRef } from "@elements/CustomModal";
import { Button, Label, Modal } from "flowbite-react";
import { MutableRefObject, useCallback } from "react";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation.svg";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  itemKey?: string | number;
  text?: string;
  onRemove?: (data: any) => any;
};

const ModalConfirmDelete = ({ modalRef, itemKey, onRemove, text }: Props) => {
  const handleDelete = useCallback(() => {
    modalRef?.current?.onHide();
    onRemove && onRemove(itemKey);
  }, [itemKey, modalRef, onRemove]);

  return (
    <>
      <Exclamation className="self-center" />
      <Modal.Body className="pt-6 justify-center text-center">
        <Label className="text-base text-center  text-gray-500">
          Are you sure you want to delete this {text}?
        </Label>
      </Modal.Body>
      <Modal.Footer className="border-t justify-center border-gray-200">
        <Button onClick={handleDelete} color="failure">
          Yes, I’m sure
        </Button>
        <Button onClick={modalRef?.current?.onHide} color="light">
          No, cancel
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalConfirmDelete;
