'use client'
import { useStore } from "@/stores/products.store";
import { doPost } from "@/utils/doMethod";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input } from "antd";
import { useParams } from "next/navigation";

type FieldType = {
  contactNumber?: string;
};

interface Props {
  name?: string,
  setPayloadProcessOrder: any,
  setCurrentStepOrder: any
}

export default function FormOrder({ setPayloadProcessOrder, setCurrentStepOrder }: Props) {
  const productStore = useStore((state: any) => state)
  const params = useParams()
  const { user } = useUser()

  const onFinish: FormProps<FieldType>['onFinish'] = (infor) => {
    const payload = {
      email: String(user?.primaryEmailAddress?.emailAddress),
      userId: String(user?.id),
      contactNumber: String(infor?.contactNumber),
      interiorId: Number(productStore?.currentInterior?.id),
      exteriorId: Number(productStore?.currentExterior?.id),
      alloyId: Number(productStore?.currentAlloy?.id),
      productId: Number(params?.id),
    }
    setPayloadProcessOrder(payload);
    setCurrentStepOrder(1)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinish} className="">
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