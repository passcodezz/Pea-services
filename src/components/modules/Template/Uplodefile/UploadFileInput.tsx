/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, useCallback, useState } from "react";
import { Upload, message, Progress } from "antd";
import { ReactComponent as FileIcon } from "@assets/images/icons/file-icon.svg";
import { ReactComponent as CancelIcon } from "@assets/images/icons/cancel-icon.svg";
import { ReactComponent as UploadIcon } from "@assets/images/icons/upload-icon.svg";
import { useDispatch } from "react-redux";
import { temPlateApi } from "@redux/api/template.api";
import { Label } from "flowbite-react";
import { trackingAsync } from "@utils/http.util";
import _ from "lodash";

type Props = {
  onGetFilesData1?: (data: any) => void;
  fileSuccess?: any;
  setFileSuccess?: any;
};

const UploadFileInput = forwardRef(({ fileSuccess, setFileSuccess }: Props) => {
  const [fileError, setFileError] = useState<any[]>([]);
  const dispatch = useDispatch();

  const customRequest = (options: any) => {
    const { file } = options;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
      "application/json",
      "application/pdf",
      "application/x-compressed",
      "application/x-zip-compressed",
    ];

    if (!allowedTypes.includes(file.type)) {
      message.error(
        "Invalid file type for attachments. Supported formats: JPEG, PNG, CSV, DOC, DOCX, PPT, PPTX, XLS, XLSX, JSON, PDF, ZIP, RAR "
      );
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error(
        "Total file size exceeded the limit, Please ensure the total file size of all attachments does not exceed 5 MB."
      );
      return false;
    }

    const req: any = {
      file: file,
    };

    trackingAsync(
      () =>
        dispatch(temPlateApi.endpoints.upLodeAttachFile.initiate(req) as any),
      {
        onSuccess: (res: any) => {
          if (res?.data?.status === true) {
            message.success("บันทึกข้อมูลสำเร็จ");

            setFileSuccess((prev: any) => {
              return [
                ...prev,
                {
                  id: res?.data?.id,
                  file_name: res?.data?.file_name,
                  size: res?.data?.size,
                },
              ];
            });
          }
        },
        onError: () => {
          setFileError((prev: any) => {
            return [
              ...prev,
              { file_name: file?.name, size: file?.size, status: "error" },
            ];
          });
        },
      }
    );
  };

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
              message.success("ลบข้อมูลสำเร็จ");
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
    [dispatch, fileSuccess, setFileSuccess]
  );

  return (
    <div>
      <Upload.Dragger
        name="file"
        customRequest={customRequest}
        showUploadList={false}
        multiple
        accept=".jpg,.jpeg,.png,.csv,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.json,.pdf,.zip,.rar"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
          <UploadIcon />
          <div className="mt-2 flex text-xs">
            <Label className="text-[#1B69FD] border-b border-[#1B69FD] mr-2">
              Click to upload
            </Label>
            or drag and drop
          </div>
          <Label className="mb-2 text-xs text-gray-500 text-center">
            Supported formats: JPEG, PNG,CSV, DOC, DOCX, PPT, PPTX, XLS, XLSX,
            JSON, PDF, ZIP, RAR <br /> Max. File Size: 5MB
          </Label>
        </div>
      </Upload.Dragger>
      <br />

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
                <Progress
                  className="md:w-[470px] lg:w-[530px]"
                  percent={100}
                  status={"success"}
                />
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => onRemove(file?.id)}>
              <CancelIcon />
            </div>
          </div>
        </div>
      ))}

      {Object.values(fileError).map((file: any) => (
        <div key={file.id} className="flex w-full">
          <div className="p-3 rounded-lg border-2 my-2 flex justify-between w-full">
            <div className="flex flex-row items-center w-full h-full">
              <div className="flex flex-col mr-4">
                <FileIcon />
              </div>
              <div className="flex flex-col ">
                <Label className="font-semibold">{file?.file_name}</Label>
                <Label className="font-semibold text-black">
                  {file?.size / 1000000} MB
                </Label>

                <Progress
                  className="md:w-[470px] lg:w-[530px] rounded-full"
                  percent={100}
                  status={"exception"}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default UploadFileInput;
