/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BoxContent from "@modules/Dashboard/BoxContent";
import SummaryStatus from "@modules/Dashboard/SummeryStatus";
import _ from "lodash";
import numeral from "numeral";
import { HiBadgeCheck } from "react-icons/hi";
import { IoBugSharp } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { LuSignal } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";
import DonutChart from "@modules/Dashboard/DonutChart";
import PieChart from "@modules/Dashboard/PieChart";
import Top5Table from "@modules/Dashboard/Top5Table";
import BarChart from "@modules/Dashboard/BarChart";
import { Button, Label, Select } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import ProDatePicker from "@elements/Inputs/ProDatePicker";
import {
  useTransactionSumMutation,
  useTransactionTop5Mutation,
  useTransactionUsageQuery,
  useTransactionYearMutation,
} from "@redux/api/dashboardService.api";
import { useCallback, useEffect, useMemo } from "react";
import moment from "moment";

const keyToLabels = (arrStr: any[]): string[] => {
  return _.map(arrStr, ({ label }) => label);
};
const getValues = (arrStr: any[]): number[] => {
  return _.map(arrStr, ({ value }) => value);
};
const genYearOptions = [
  ...Array(10)
    .fill(null)
    .map((_, index) => {
      return new Date().getFullYear() - index;
    }),
].sort();
const Dashboard = () => {
  const { control, watch, handleSubmit } = useForm();
  const [onGetTop5, top5result] = useTransactionTop5Mutation();
  const [onGetSum, sumResult] = useTransactionSumMutation();
  const [onGetTransactionYear, transactionYearResult] =
    useTransactionYearMutation();

  const sumUsage = useTransactionUsageQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const startDate = watch("start_time");
  const endDate = watch("end_time");
  const currentDate = moment();
  const newDate = moment().subtract(30, "days");

  const onSearch = useCallback((formData: any) => {
    onGetTop5({
      start_time: moment(formData.start_time).format("YYYY-MM-DDTHH:mm:ss"),
      end_time: moment(formData.end_time).format("YYYY-MM-DDTHH:mm:ss"),
    });
    onGetSum({
      start_time: moment(formData.start_time).format("YYYY-MM-DDTHH:mm:ss"),
      end_time: moment(formData.end_time).format("YYYY-MM-DDTHH:mm:ss"),
    });
  }, []);

  useEffect(() => {
    onGetTop5({
      start_time: newDate.format("YYYY-MM-DDTHH:mm:ss"),
      end_time: currentDate.format("YYYY-MM-DDTHH:mm:ss"),
    });
    onGetSum({
      start_time: newDate.format("YYYY-MM-DDTHH:mm:ss"),
      end_time: currentDate.format("YYYY-MM-DDTHH:mm:ss"),
    });
    onGetTransactionYear({ year: moment().year() });
    return () => {};
  }, []);

  // useEffect(() => {
  //   if (!startDate) {
  //     setValue("end_time", "");
  //   }
  //   return () => {};
  // }, [startDate, setValue]);

  const transactionYearResultData: Record<string, number>[] = useMemo(() => {
    return [
      {
        name: "Processing",
        data: transactionYearResult?.data?.datas?.map(({ processing }: any) => {
          return processing;
        }),
      },
      {
        name: "Waiting for send",
        data: transactionYearResult?.data?.datas?.map(
          ({ waiting_for_send }: any) => {
            return waiting_for_send;
          }
        ),
      },
      {
        name: "Success",
        data: transactionYearResult?.data?.datas?.map(({ success }: any) => {
          return success;
        }),
      },
      {
        name: "Error",
        data: transactionYearResult?.data?.datas?.map(({ error }: any) => {
          return error;
        }),
      },
    ] as any;
  }, [transactionYearResult]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row gap-4 px-5  lg:items-end">
        <div className="flex flex-col">
          <Label className="text-gray-900 text-base">Date From</Label>
          <div className="mt-2 flex flex-row gap-4">
            <Controller
              name="start_time"
              control={control}
              defaultValue={newDate}
              render={({ field }) => (
                <ProDatePicker
                  value={field.value}
                  className="w-[250px]"
                  disabledDate={(data) => {
                    return (
                      data > moment(endDate) ||
                      data < moment(endDate).subtract(180, "days")
                    );
                  }}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label className="text-gray-900 text-base">Date To</Label>
          <div className="mt-2 flex flex-row gap-4">
            <Controller
              name="end_time"
              control={control}
              defaultValue={currentDate}
              render={({ field }) => (
                <ProDatePicker
                  className="w-[250px]"
                  disabled={!startDate}
                  value={field.value}
                  disabledDate={(data) => {
                    return (
                      data < moment(startDate) ||
                      data > moment(startDate).add(180, "days")
                    );
                  }}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <Button
          color="primary"
          disabled={!startDate || !endDate}
          onClick={handleSubmit(onSearch)}
        >
          Search
        </Button>
      </div>
      <div className="flex flex-col p-4 lg:p-6 gap-6 bg-[#F9FAFB]">
        <div className="flex flex-col lg:flex-row w-full gap-3.5">
          <BoxContent className="px-7 pt-8 pb-6 w-full lg:w-[70%] xl:w-4/5 flex flex-col">
            <div className="text-indigo-950 text-2xl font-semibold">
              Transaction Summery by status
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2  xl:grid-cols-5 mt-9 gap-7">
              <SummaryStatus
                cardClass="bg-[#EFF1F3] text-white"
                iconClass="bg-[#A6AEBE]"
                icon={<LuSignal />}
                sumStatus={numeral(
                  sumResult?.data?.transaction_sum_status?.total_transaction
                ).format("0,0")}
                desc="Total Transaction"
              />
              <SummaryStatus
                cardClass="bg-[#FFF4DE] text-white"
                iconClass="bg-[#FF947A]"
                icon={<TfiReload />}
                sumStatus={numeral(
                  sumResult?.data?.transaction_sum_status?.processing
                ).format("0,0")}
                desc="Processing"
              />
              <SummaryStatus
                cardClass="bg-[#E6F0FB] text-white"
                iconClass="bg-[#1F64E7]"
                icon={<IoMdChatboxes />}
                sumStatus={numeral(
                  sumResult?.data?.transaction_sum_status?.waiting_for_send
                ).format("0,0")}
                desc="Waiting for send"
              />
              <SummaryStatus
                cardClass="bg-[#FFE2E5] text-white"
                iconClass="bg-[#FA5A7D]"
                icon={<IoBugSharp />}
                sumStatus={numeral(
                  sumResult?.data?.transaction_sum_status?.error
                ).format("0,0")}
                desc="Error"
              />
              <SummaryStatus
                cardClass="bg-[#DCFCE7] text-white"
                iconClass="bg-[#3CD856]"
                icon={<HiBadgeCheck />}
                sumStatus={numeral(
                  sumResult?.data?.transaction_sum_status?.success
                ).format("0,0")}
                desc="Success"
              />
            </div>
          </BoxContent>
          <BoxContent className="px-7 pt-8 pb-6 w-2/4  lg:w-[30%] xl:w-1/5 flex flex-col">
            <div className="text-indigo-950 text-2xl font-semibold">
              Summary Usage
            </div>
            <div className="mt-9">
              <SummaryStatus
                cardClass="bg-[#EDE9FE] text-white overflow-auto"
                iconClass="bg-[#6366F1]"
                icon={<HiBadgeCheck />}
                sumStatus={sumUsage?.data?.summary_usage}
                desc={
                  <div className="flex flex-col">
                    <span>Usage / Available</span>
                    <span className="text-[#C81E1E] text-base">
                      Expire in {sumUsage?.data?.expired}
                    </span>
                  </div>
                }
              />
            </div>
          </BoxContent>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <BoxContent className="px-7 pt-8 pb-6 full flex flex-col">
            <div className="text-indigo-950 text-lg font-semibold">
              สัดส่วนสถานะการส่งจดหมายอิเล็กซ์ทรอนิกส์
            </div>
            <div className="mt-9">
              <DonutChart
                labels={keyToLabels(sumResult?.data?.transaction_sum_ratio)}
                series={getValues(sumResult?.data?.transaction_sum_ratio)}
              />
            </div>
          </BoxContent>
          <BoxContent className="px-7 pt-8 pb-6 full flex flex-col">
            <div className="text-indigo-950 text-lg font-semibold">
              สัดส่วนการเปิดอ่านจดหมายอิเล็กซ์ทรอนิกส์
            </div>
            <div className="mt-9">
              <PieChart
                labels={keyToLabels(sumResult?.data?.transaction_sum_open_mail)}
                series={getValues(sumResult?.data?.transaction_sum_open_mail)}
              />
            </div>
          </BoxContent>
          <BoxContent className="px-7 pt-8 pb-6 full flex flex-col">
            <div className="text-indigo-950 text-lg font-semibold">
              5 อันดับประเภทจดหมายอิเล็กทรอนิกส์ที่มีจำนวนการส่งมากที่สุด
            </div>
            <div className="mt-9">
              <Top5Table dataSource={top5result?.data?.transaction_type_tops} />
            </div>
          </BoxContent>
        </div>
        <BoxContent className="px-7 pt-8 pb-6 full flex flex-col">
          <div className="flex flex-row gap-4 items-center">
            <div className="text-indigo-950 text-lg font-semibold">
              สรุปจำนวนการส่งจดหมายอิเล็กซ์ทรอนิกส์เปรียบเทียบรายเดือน
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="text-indigo-950 text-lg font-semibold">ปี:</div>
              <Select
                defaultValue={moment().year()}
                onChange={(e) =>
                  onGetTransactionYear({ year: e?.target?.value })
                }
                className="w-[100px] text-indigo-950 text-lg "
              >
                {genYearOptions.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select>
            </div>
          </div>
          <div className="mt-9">
            <BarChart series={transactionYearResultData} />
          </div>
        </BoxContent>
      </div>
    </div>
  );
};

export default Dashboard;
