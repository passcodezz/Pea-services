/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomModal, {
  CustomModalProps,
  CustomModalRef,
} from "@elements/CustomModal";
import I18nButton, { I18nButtonProps } from "@elements/I18nButton";
import classNames from "classnames";
import { Modal } from "flowbite-react";
import { FC, cloneElement, useRef } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
type Props = {
  header?: string;
  buttonProps?: I18nButtonProps;
  modalProps?: CustomModalProps;
} & CustomModalProps;

const BtnModal: FC<Props> = ({ header, children, modalProps, buttonProps }) => {
  const ref = useRef<CustomModalRef>(null);
  return (
    <>
      <I18nButton
        startIcon={<HiOutlinePencilAlt className="text-lg" />}
        {...buttonProps}
        onClick={() => {
          ref.current?.onShow();
        }}
      />
      <CustomModal {...modalProps} ref={ref}>
        <Modal.Header
          className={classNames({
            "border-b border-gray-200 p-4 dark:border-gray-700": header,
          })}
        >
          {<strong>{header}</strong>}
        </Modal.Header>
        {cloneElement((children as any) || <></>, {
          modalRef: ref,
        })}
      </CustomModal>
    </>
  );
};

export default BtnModal;
