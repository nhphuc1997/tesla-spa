'use client'
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";

type FieldType = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
};

interface Props {
  name?: string,
  setOpersonalInfor: any,
  setCurrentStepOrder: any
}

export default function FormOrder({ setOpersonalInfor, setCurrentStepOrder }: Props) {
  const [] = useState()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setOpersonalInfor(values)
    setCurrentStepOrder(1)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinish} className="!px-10">
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
        <Form.Item<FieldType> name="contactNumber" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your contact number"
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </div>

      <Divider />

      <div className="flex justify-end items-center">
        <Button className="!bg-black !text-white" htmlType="submit">
          Next Step
        </Button>
      </div>
    </Form>
  )
}