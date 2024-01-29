/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card, Label, Modal } from "flowbite-react";
// import { MutableRefObject } from "react";
// import { CustomModalRef } from "@elements/CustomModal";
import { ReactComponent as FileIcon } from "@assets/images/icons/file-icon.svg";
import dayjs from "dayjs";
// type Props = {
//   modalRef?: MutableRefObject<CustomModalRef>;
//   value?: any;
//   itemKey?: string | number;
// };

const dataSource = {
  subject: "การไฟฟ้าแจ้งชำระค่าบริการประจำเดือน ตุลาคม 2566",
  sender_name: "Provincial Electricity Authority (การไฟฟ้าส่วนภูมิภาค)",
  sender_from: "pea@company.co.th",
  recipient_name: "customerABC@mail.com",
  sent_to: "customerABC@mail.com",
  transaction_group: "หนังสือแจ้งค่าบริการ",
  priority: 1,
  create_date: "01/10/2023",
  sent_date: "01/10/2023",
  server: "AWS",
  open_date: "01/10/2023",
  open_count: 1,
  status: 2,
  message_id: "MES_000123",
  error_type: "-",
  error_message: "-",
  email_content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam",
  attachment_files: [
    {
      id: 103,
      size: 18503,
      file_name: "d0aeb778-96b8-470a-8403-efe723d99c14.png",
      file_path: "/d0aeb778-96b8-470a-8403-efe723d99c14.png",
    },
  ],
};

type Props = {
  id?: any;
};

const ModalDetailTranSectionLog = ({ id }: Props) => {
  // const { currentData } = useGetLogDetailQuery(id, {
  //   skip: !id,
  //   refetchOnMountOrArgChange: true,
  // });

  // const [
  //   fileSuccess,
  //   //setFileSuccess
  // ] = useState<any[]>(dataSource.attachment_files);

  return (
    <>
      <Modal.Body className="pt-4">
        <div className="p-4">
          <div className="flex flex-col gap-2 mb-10">
            <Label className="text-base font-semibold text-gray-500">
              Subject
            </Label>
            <Label>{dataSource.subject}</Label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Sender Name
              </Label>
              <Label>{dataSource.sender_name}</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Sender From
              </Label>
              <Label>{dataSource.sender_from}</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Recipient Name
              </Label>
              <Label>{dataSource.recipient_name}</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Sent to
              </Label>
              <Label>{dataSource.sent_to}</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Transaction group
              </Label>
              <Label>{dataSource.transaction_group}</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Priority
              </Label>
              <Label>
                {dataSource.priority === 1
                  ? "Low"
                  : dataSource.priority === 2
                  ? "Medium "
                  : dataSource.priority === 3
                  ? "High"
                  : dataSource.priority}
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Create Date
              </Label>
              <Label>
                {dataSource.create_date
                  ? dayjs(dataSource.create_date).format("DD/MM/YYYY")
                  : "-"}
              </Label>
            </div>

            <div className="flex flex-row gap-28">
              <div className="flex flex-col gap-2">
                <Label className="text-base font-semibold text-gray-500">
                  Sent Date
                </Label>
                <Label>
                  {dataSource.create_date
                    ? dayjs(dataSource.sent_date).format("DD/MM/YYYY")
                    : "-"}
                </Label>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-base font-semibold text-gray-500">
                  Server ปลายทาง
                </Label>
                <Label>{dataSource.server}</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Open Date
              </Label>
              <Label>
                {dataSource.open_date
                  ? dayjs(dataSource.sent_date).format("DD/MM/YYYY")
                  : "-"}
              </Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                จำนวนครั้งที่เปิดอ่าน
              </Label>
              <Label>{dataSource.open_count}</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Status
              </Label>
              {dataSource.status === 2 ? (
                <div className="p-2 w-28 rounded-lg bg-green-200 text-center text-green-500">
                  Success
                </div>
              ) : dataSource.status === 3 ? (
                <div className="p-2 w-28 rounded-lg bg-red-200 text-center text-red-500">
                  Error
                </div>
              ) : dataSource.status === 1 ? (
                <div className="p-2 w-28 rounded-lg bg-amber-200 text-center text-amber-500">
                  Processing
                </div>
              ) : dataSource.status === 4 ? (
                <div className="p-2 w-28 rounded-lg bg-cyan-200 text-center text-cyan-500">
                  Wait for send
                </div>
              ) : (
                <div className="p-2 w-28 rounded-lg bg-red-200 text-center text-red-500">
                  {dataSource.status ? dataSource.status : "Error"}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Message ID
              </Label>
              <Label>{dataSource.message_id}</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Error Type
              </Label>
              <Label>{dataSource.error_type}</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold text-gray-500">
                Error message
              </Label>
              <Label>{dataSource.error_message}</Label>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10">
            <Label className="text-base font-semibold text-gray-500">
              Email Content
            </Label>
            <Card>{dataSource.email_content}</Card>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold text-gray-500">
              Attachment files
            </Label>
            <div>
              {Object.values(dataSource.attachment_files).map((file: any) => (
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalDetailTranSectionLog;
