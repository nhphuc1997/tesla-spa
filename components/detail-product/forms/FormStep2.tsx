'use client'
import { DISTANCE_RADIUS } from "@/utils";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, FormProps, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react"

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  additionalInfor?: string;
};

interface Props {
  name?: string,
  setCurrentStep: any,
  valueFormStep1: any,
}

export default function FormStep2({ setCurrentStep, valueFormStep1 }: Props) {
  const onFinishStep2: FormProps<FieldType>['onFinish'] = (valueFormStep2) => {
    console.log(valueFormStep1);
    console.log(valueFormStep2);

    setCurrentStep(2)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinishStep2}>
      <div className="pb-2">
        <Form.Item<FieldType> name="firstName" rules={[{ required: true }]}>
          <Input
            onChange={e => console.log(e)}
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
        <Form.Item<FieldType> name="email" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your email"
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
        <Button iconPosition={"end"} icon={<SendOutlined />} htmlType="submit">Next</Button>
      </div>
    </Form>
  )
}