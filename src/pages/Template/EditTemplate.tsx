/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { Translation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import ContentCard from "@elements/ContentCard";
import FormItem from "@elements/FormItem";
import { useForm } from "react-hook-form";
import BtnModal from "@elements/Buttons/BtnModal";
import TestSendEmailForm from "@modules/Template/SendEmail/ModalTestSendEmailForm";
import UploadAttachmentFiles from "@modules/Template/Uplodefile/ModalUploadAttachmentFiles";
import CKEditorCustom from "@elements/CKEditorCustom";
import { trackingAsync } from "@utils/http.util";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  temPlateApi,
  useGetEmailTemplateByIdQuery,
} from "@redux/api/template.api";
import { ReactComponent as FileIcon } from "@assets/images/icons/file-icon.svg";
import { ReactComponent as CancelIcon } from "@assets/images/icons/cancel-icon.svg";
import _ from "lodash";
import { NotificationDel, NotificationSuc } from "@elements/Notification";

const EditTemplate = () => {
  const { control, handleSubmit, reset } = useForm();
  const [itemContent, setItemContent] = useState();
  const router = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [fileSuccess, setFileSuccess] = useState<any[]>([]);

  const { currentData } = useGetEmailTemplateByIdQuery(params?.id, {
    skip: !params?.id,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (currentData) {
      reset(currentData);
      setFileSuccess(currentData?.attachments);
    }
  }, [currentData, reset]);

  const onGetFiles = useCallback((file: any) => {
    setFileSuccess((prev: any) => [...prev, ...file]);
  }, []);

  const onFinish = useCallback(
    (form: any) => {
      const req: any = {
        id: form?.id,
        name: form?.name,
        is_enable: form?.is_enable,
        content: itemContent ? itemContent : form?.content,
        subject: form?.subject,
        attachments: fileSuccess,
        // attachments: fileSuccess.length > 0 ? fileSuccess : null,
      };
      trackingAsync(
        () =>
          dispatch(
            temPlateApi.endpoints.updateEmailTemplate.initiate(req) as any
          ),
        {
          onSuccess: (res) => {
            if (res?.data?.status === true) {
              NotificationSuc();
              router("/template");
            }
          },
          // onError: (res) => {
          //   if (_.size(res?.data?.errors)) {
          //     _.forEach(res?.data?.errors, ({ description }) =>
          //       NotificationError(description)
          //     );
          //   }
          // },
        }
      );
    },
    [dispatch, fileSuccess, itemContent, router]
  );

  const onRemove = useCallback(
    (file_id: any) => {
      trackingAsync(
        () =>
          dispatch(
            temPlateApi.endpoints.deleteAttachFile.initiate(file_id) as any
          ),
        {
          onSuccess: (res: any) => {
            if (res?.data?.status === true) {
              NotificationDel();
              // ให้หา index ของ item ที่ต้องการลบ
              const indexToRemove = fileSuccess.findIndex(
                (item: any) => item.id === file_id
              );
              // ถ้าเจอ index ให้ทำการลบ item นั้น ๆ
              if (indexToRemove !== -1) {
                setFileSuccess((prev: any) => {
                  const newArray = [...prev];
                  newArray.splice(indexToRemove, 1);
                  return newArray;
                });
              }
            }
          },
        }
      );
    },
    [dispatch, fileSuccess]
  );

  return (
    <div className="h-screen">
      <div className="m-4">
        <Translation>
          {(t) => (
            <Label className="text-gray-900 text-2xl font-bold">
              {t("page.template.pageNameEdit")}
            </Label>
          )}
        </Translation>
      </div>
      <div>
        <ContentCard>
          <div className="flex flex-col p-8">
            <div className="grid grid-cols-2 gap-8">
              <FormItem
                name="name"
                control={control}
                label="Template Name"
                required
                rules={{
                  required: "Please select Template Name",
                }}
              >
                <TextInput type="text" />
              </FormItem>

              <div className="flex flex-row mt-6 gap-3">
                <FormItem
                  control={control}
                  valueEvent="onChange"
                  name="is_enable"
                >
                  {({ field }) => (
                    <ToggleSwitch
                      label=""
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormItem>
                <div className="flex flex-col w-full">
                  <p className="font-medium text-sm">Active</p>
                  <p className="text-xs text-gray-500">
                    Enable for active this template.
                  </p>
                </div>
              </div>
            </div>

            <FormItem
              name="subject"
              control={control}
              label="Subject"
              required
              rules={{
                required: "Please select Subject",
              }}
            >
              <TextInput placeholder="Subject..." type="text" />
            </FormItem>
          </div>

          <div className="px-8">
            <CKEditorCustom
              value={currentData?.content}
              onChange={(editor) => setItemContent(editor.data)}
            />
          </div>

          <div className="flex flex-row px-8 pt-6 gap-4">
            <BtnModal
              header="Upload Attachment files"
              buttonProps={{
                startIcon: <></>,
                className: "mt-2  border-[#1A56DB] text-[#1A56DB]",
                color: "light",
                text: "Upload Attachment file",
              }}
            >
              <UploadAttachmentFiles onGetFiles={onGetFiles} />
            </BtnModal>
          </div>

          <div className="m-8">
            {Object.values(fileSuccess).map((file: any) => (
              <div key={file.id} className="flex w-full">
                <div className="p-3 rounded-lg border-2 my-2 flex justify-between w-full">
                  <div className="flex flex-row items-center w-full h-full">
                    <div className="flex flex-col mr-4">
                      <FileIcon />
                    </div>
                    <div className="flex flex-col ">
                      <Label className="font-semibold text-black">
                        {file?.file_name}
                      </Label>

                      <Label className="font-semibold text-black">
                        {file?.size / 1000000} MB
                      </Label>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => onRemove(file?.id)}
                  >
                    <CancelIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row p-8 gap-4">
            <Button
              color="primary"
              className="mt-2 w-32"
              type="submit"
              onClick={handleSubmit(onFinish)}
            >
              Save Template
            </Button>
            <BtnModal
              header="Test Send"
              buttonProps={{
                startIcon: <></>,
                className: "mt-2 w-32 border-[#1A56DB] text-[#1A56DB]",
                color: "light",
                text: "Test send",
              }}
            >
              <TestSendEmailForm
                content={itemContent}
                template_id={params?.id}
              />
            </BtnModal>
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default EditTemplate;
