'use client'
import { doPost } from "@/utils/doMethod";
import { UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input } from "antd";

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

  const orderMutation = useMutation({
    mutationKey: ['order-process'],
    mutationFn: async (payload: any) => {
      return await doPost('/orders', payload)
    },
    onSuccess(data) {
      if (data?.statusCode === 200) {
        console.log('okaayyy');

      }
    },
    onError() {
      console.log('not okaayyy');
    }
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setOpersonalInfor(values)
    console.log(values);
    const payload = {
      email: String(),
      userId: String(),
      contactNumber: String(),
      interiorId: String(),
      exteriorId: String(),
      alloyId: String(),
      productId: String(),
    }

    setCurrentStepOrder(1)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinish} className="">
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

      <div className="flex justify-end items-center">
        <Button className="!bg-black !text-white" htmlType="submit">
          Next Step
        </Button>
      </div>
    </Form>
  )
}