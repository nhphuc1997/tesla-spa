'use client'
import { DISTANCE_RADIUS } from "@/utils";
import { Button, DatePicker, Form, FormProps, Select } from "antd";
import { useState } from "react"

type FieldType = {
  postCode?: string;
  distanceRadius?: string;
  pickedDate?: string;
};

interface Props {
  name?: string,
  setCurrentStep: any,
  setValueFormStep1: any,
}

export default function FormStep1({ setCurrentStep, setValueFormStep1 }: Props) {
  const [postCode, setPostCode] = useState(null)
  const [distanceRadius, setDistanceRadius] = useState(null)
  const [pickedDate, setPickedDate] = useState(null)

  const onFinishStep1: FormProps<FieldType>['onFinish'] = (values) => {
    setValueFormStep1(values);
    setCurrentStep(1)
  }

  return (
    <Form name="basic" autoComplete="off" onFinish={onFinishStep1}>
      <div className="pb-2">
        <Form.Item<FieldType> name="postCode" rules={[{ required: true }]}>
          <Select
            value={postCode}
            className="w-full"
            showSearch
            placeholder="Add your location or postal code"
            optionFilterProp="label"
            onChange={(value: any) => setPostCode(value)}
            options={[
              {
                value: '10000',
                label: 'Vietnam',
              }
            ]}
          />
        </Form.Item>
      </div>

      <div className="pb-2">
        <Form.Item<FieldType> name="distanceRadius" rules={[{ required: true }]}>
          <Select
            value={distanceRadius}
            className="w-full"
            showSearch
            placeholder="Distance radius"
            optionFilterProp="label"
            onChange={(value: any) => setDistanceRadius(value)}
            options={DISTANCE_RADIUS}
          />
        </Form.Item>
      </div>

      <div className="pb-2">
        <Form.Item<FieldType> name="pickedDate" rules={[{ required: true }]}>
          <DatePicker value={pickedDate} className="w-full" onChange={(value: any) => setPickedDate(value)} />
        </Form.Item>
      </div>

      <div className="flex justify-end items-center">
        <Button htmlType="submit">Next</Button>
      </div>
    </Form>
  )
}