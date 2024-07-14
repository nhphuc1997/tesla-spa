'use client'
import { doPost } from "@/utils/doMethod";
import { BackwardOutlined, DoubleLeftOutlined, DoubleRightOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

type FieldType = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  additionalInfor?: string;
};

interface Props {
  name?: string,
  setCurrentStep: any,
  setSubmitOK: any,
  valueFormStep1: any,
}

export default function FormStep2({ setCurrentStep, valueFormStep1, setSubmitOK }: Props) {
  const { user } = useUser()
  const params = useParams()

  const resetButton = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const bookATestDrivemutation = useMutation({
    mutationKey: ['book-a-test-drive'],
    mutationFn: async (payload: any) => {
      setLoading(true);
      setSubmitOK(null);
      return await doPost('/orders', payload)
    },
    onSuccess(data) {
      setLoading(false)
      if (data?.statusCode === 200) {
        setCurrentStep(2)
        setSubmitOK(true)
        resetButton?.current?.click()
        return
      }

      setSubmitOK(false)
      return
    },
    onError() {
      setLoading(false)
      setCurrentStep(1)
    }
  })

  const onFinishStep2: FormProps<FieldType>['onFinish'] = (valueFormStep2) => {
    const payload = {
      distanceRadius: String(valueFormStep1?.distanceRadius),
      postCode: String(valueFormStep1?.postCode),
      pickedDate: new Date(valueFormStep1?.pickedDate),
      contactNumber: String(valueFormStep2?.contactNumber),
      email: String(user?.primaryEmailAddress?.emailAddress),
      firstName: String(valueFormStep2?.firstName),
      lastName: String(valueFormStep2?.lastName),
      productId: Number(params?.id)
    }
    bookATestDrivemutation.mutate(payload)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinishStep2}>
      <div className="pb-2">
        <Form.Item<FieldType> name="firstName" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your first name"
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </div>

      <div className="pb-2">
        <Form.Item<FieldType> name="lastName" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your last name"
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </div>

      <div className="pb-2">
        <Form.Item<FieldType> name="contactNumber" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your contact number"
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </div>

      <div className="pb-2">
        <Form.Item<FieldType> name="additionalInfor" rules={[{ required: false }]}>
          <TextArea placeholder="additional information" allowClear />
        </Form.Item>
      </div>

      <div className="flex justify-end items-center">
        <Button
          loading={loading}
          iconPosition={"start"}
          icon={<DoubleLeftOutlined />}
          onClick={() => {
            setSubmitOK(null)
            setCurrentStep(0)
          }}
        >
          Back
        </Button>

        <div className="px-3" />

        <Button
          loading={loading}
          iconPosition={"end"}
          icon={<DoubleRightOutlined />}
          htmlType="submit"
          className="!bg-black !text-white"
        >
          Submit
        </Button>

        <Button
          htmlType="reset"
          ref={resetButton}
          className="!hidden"
        />
      </div>
    </Form>
  )
}