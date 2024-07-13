'use client'
import { useState } from "react";
import FormStep1 from "./FormStep1";


export default function BookATestDrive() {
  const [currentStep, setCurrentStep] = useState(0)
  const [valueFormStep1, setValueFormStep1] = useState(null)

  return (
    <div className="">
      {currentStep === 0 && (
        <FormStep1
          setCurrentStep={setCurrentStep}
          setValueFormStep1={setValueFormStep1}
        />
      )}
    </div>
  )
}