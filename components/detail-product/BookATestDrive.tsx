"use client";
import { useEffect, useState } from "react";
import FormStep1 from "./forms/FormStep1";
import FormStep2 from "./forms/FormStep2";
import { notification, Result, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { doGet } from "@/utils/doMethod";

export default function BookATestDrive() {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useUser();
  const params = useParams();

  useQuery({
    queryKey: ["check-already-booked-before"],
    queryFn: async () => {
      const query = { userId: String(user?.id), productId: Number(params?.id) };
      const response = await doGet("/book-test-drive", {
        s: JSON.stringify(query),
      });
      if (response?.statusCode === 200) {
        if (response?.data?.length > 0) {
          setCurrentStep(2);
          return true;
        }
      }
      return false;
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [valueFormStep1, setValueFormStep1] = useState(null);
  const [submitOK, setSubmitOK] = useState(null);

  useEffect(() => {
    if (submitOK && currentStep === 2) {
      api.open({
        message: null,
        description: "Book a test driver successfully",
      });
      return;
    }

    if (submitOK === false && currentStep === 1) {
      api.open({ message: null, description: "Book a test driver failed" });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitOK, currentStep]);

  return (
    <div className="">
      {contextHolder}
      {currentStep === 0 && (
        <FormStep1
          setCurrentStep={setCurrentStep}
          setValueFormStep1={setValueFormStep1}
        />
      )}

      {currentStep === 1 && (
        <FormStep2
          setCurrentStep={setCurrentStep}
          valueFormStep1={valueFormStep1}
          setSubmitOK={setSubmitOK}
        />
      )}

      {currentStep === 2 && (
        <Result
          status="success"
          title={
            <div>
              <Typography.Title>
                Book A Test Drive Successfully
              </Typography.Title>

              <Typography.Text>
                we will contact you as soon as possible!!
              </Typography.Text>
            </div>
          }
          subTitle=""
        />
      )}
    </div>
  );
}
