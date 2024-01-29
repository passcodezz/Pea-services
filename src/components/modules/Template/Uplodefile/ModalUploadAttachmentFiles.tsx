/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomModalRef } from "@elements/CustomModal";
import FormItem from "@elements/FormItem";
import { Button, Modal } from "flowbite-react";
import { MutableRefObject, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import UploadFileInput from "./UploadFileInput";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  onGetFiles: (data: any) => void;
};

const UploadAttachmentFiles = ({ modalRef, onGetFiles }: Props) => {
  const { control, handleSubmit } = useForm();
  const [fileSuccess, setFileSuccess] = useState<any[]>([]);

  const onCancel = useCallback(() => {
    onGetFiles && onGetFiles(fileSuccess);
    modalRef?.current?.onHide();
  }, [fileSuccess, modalRef, onGetFiles]);

  return (
    <>
      <Modal.Body className="pt-4">
        <FormItem control={control} label="" name="file">
          {({ field }) => (
            <UploadFileInput
              {...field}
              fileSuccess={fileSuccess}
              setFileSuccess={setFileSuccess}
            />
          )}
        </FormItem>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200">
        <Button
          onClick={handleSubmit(onCancel)}
          className="mt-2"
          color="primary"
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default UploadAttachmentFiles;
