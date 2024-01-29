/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RegExs } from "@constants/regular";
import { CustomModalRef } from "@elements/CustomModal";
import FormItem from "@elements/FormItem";
import { trackingAsync } from "@utils/http.util";
import { Button, Modal, TextInput } from "flowbite-react";
import { MutableRefObject, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { notiApi } from "@redux/api/notiApi.api";
import _ from "lodash";
import { NotificationSuc } from "@elements/Notification";

type Props = {
  modalRef?: MutableRefObject<CustomModalRef>;
  content?: any;
  template_id?: any;
};

const TestSendEmailForm = ({ modalRef, content, template_id }: Props) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSendEmail = useCallback(
    (form: any) => {
      const req: any = {
        send_to: form.send_to,
        content: content,
        template_id: template_id ? parseInt(template_id, 10) : 0,
      };
      trackingAsync(
        () =>
          dispatch(
            notiApi.endpoints.testSendEmailTemPlate.initiate(req) as any
          ),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              const description = "Test send Successfully";
              NotificationSuc(description);
            }
            modalRef?.current?.onHide();
          },
        }
      );
    },
    [content, dispatch, modalRef, template_id]
  );

  return (
    <>
      <Modal.Body className="pt-4">
        <FormItem
          name="send_to"
          control={control}
          label="Email"
          required
          rules={{
            required: "Please enter Email",
            pattern: {
              value: RegExs.EMAIL,
              message: "The email is invalid format.",
            },
          }}
        >
          <TextInput placeholder="test@company.com" />
        </FormItem>

        <p className="text-xs text-gray-500">
          Enter the recipient's email address to test send an email.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200">
        <Button onClick={handleSubmit(onSendEmail)} color="primary">
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default TestSendEmailForm;
