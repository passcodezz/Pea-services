/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Col, Row } from "antd";
import { ReactComponent as Exclamation } from "@assets/images/icons/exclamation.svg";
import { Label, Button } from "flowbite-react";

type Props = {
  onOk?: (modal?: any) => void;
  onCancel?: (modal?: any) => void;
  modal?: any;
};

const AlertTokenExpire = ({ modal, onOk }: Props) => {
  return (
    <div className="flex flex-col bg-white ">
      <Row className="mt-6" justify="center">
        <Col className="text-center my-4">
          <Exclamation className="self-center" />
        </Col>
        <Col className="text-center" span={24}>
          <Label className="text-base text-center  text-gray-500">
            Your account has been suspended. <br /> Please contact admin.
          </Label>
        </Col>
      </Row>
      <Row className="mt-6" justify="center" gutter={[16, 16]}>
        <Col span={4}>
          <Button
            onClick={() => onOk && onOk(modal)}
            className="w-full bg-[#1A56DB]"
            // color="blue"
          >
            OK
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AlertTokenExpire;
