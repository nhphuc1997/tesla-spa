'use client'
import { doPost } from "@/utils/doMethod";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

type FieldType = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  additionalInfor?: string;
};

interface Props {
  name?: string,
  setCurrentStep: any,
  valueFormStep1: any,
}

export default function FormStep2({ setCurrentStep, valueFormStep1 }: Props) {
  const { user } = useUser()

  const [loading, setLoading] = useState<boolean>(false)

  const bookATestDrivemutation = useMutation({
    mutationKey: ['book-a-test-drive'],
    mutationFn: async (payload: any) => {
      setLoading(true);
      return await doPost('/orders', payload)
    },
    onSuccess(data) {
      setLoading(false)
      if (data?.statusCode === 200) {
        setCurrentStep(2)
      }
    },
    onError() {
      setLoading(false)
      setCurrentStep(1)
    }
  })

  const onFinishStep2: FormProps<FieldType>['onFinish'] = (valueFormStep2) => {
    const payload = {
      distanceRadius: valueFormStep1?.distanceRadius,
      postCode: valueFormStep1?.postCode,
      pickedDate: new Date(valueFormStep1?.pickedDate),
      contactNumber: valueFormStep2?.contactNumber,
      email: user?.primaryEmailAddress?.emailAddress,
      firstName: valueFormStep2?.firstName,
      lastName: valueFormStep2?.lastName,
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
          iconPosition={"end"}
          icon={<SendOutlined />}
          htmlType="submit"
          className="!bg-black !text-white"
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}