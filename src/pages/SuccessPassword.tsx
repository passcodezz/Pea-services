/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Card } from "flowbite-react";
import { Translation } from "react-i18next";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4 lg:p-0 ">
      <Card className="w-full max-w-[772px] p-4 text-center">
        <Translation>
          {(t) => (
            <>
              <h1 className="text-gray-900 text-4xl ">
                {t("page.success_pw.title")}
              </h1>
              <p className=" text-gray-500">{t("page.success_pw.subtitle")}</p>
            </>
          )}
        </Translation>

        <div className="flex flex-col mt-10 items-center">
          <div className="flex flex-row">
            <Translation>
              {(t) => (
                <Button
                  color="primary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {t("page.success_pw.text_success_pw")}
                </Button>
              )}
            </Translation>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
