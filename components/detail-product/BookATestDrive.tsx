'use client'
import { useState } from "react";
import FormStep1 from "./forms/FormStep1";
import FormStep2 from "./forms/FormStep2";
import { Result, Typography } from "antd";

export default function BookATestDrive() {
  const [currentStep, setCurrentStep] = useState(0)
  const [valueFormStep1, setValueFormStep1] = useState(null)
  const [valueFormStep2, setValueFormStep2] = useState(null)

  console.log(valueFormStep1, 'valueFormStep1');
  console.log(valueFormStep2, 'valueFormStep2');


  return (
    <div className="">
      {currentStep === 0 && (
        <FormStep1
          setCurrentStep={setCurrentStep}
          setValueFormStep1={setValueFormStep1}
        />
      )}

      {currentStep === 1 && (
        <FormStep2
          setCurrentStep={setCurrentStep}
          setValueFormStep2={setValueFormStep2}
        />
      )}

      {currentStep === 2 && (
        <Result
          status="success"
          title={
            <div>
              <Typography.Title>
                Book a Test Drive successfully
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
  )
}