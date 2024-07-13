import { formatCurrency } from "@/utils/format-currency";
import { Button, Descriptions, Divider, Typography } from "antd";
import BookATestDrive from "./BookATestDrive";

export default function OrderView() {
  return (
    <div>
      <div className="p-3 border">
        <Typography.Title level={5} className="!mt-3 text-center">Mescedes benz</Typography.Title>
        <Divider className="" />
        <div>
          <Descriptions title="" column={1}>
            <Descriptions.Item label="Material">Material</Descriptions.Item>
            <Descriptions.Item label="Exterior">Exterior</Descriptions.Item>
            <Descriptions.Item label="Interior">Exterior</Descriptions.Item>
            <Descriptions.Item label="Alloys">Alloys</Descriptions.Item>
            <Descriptions.Item label="Description">Description</Descriptions.Item>
          </Descriptions>
        </div>
        <Divider className="" />
        <div>
          <Typography.Title level={5} className="text-right">
            TOTAL: {formatCurrency(100000)}
          </Typography.Title>
        </div>

        <div>
          <Button className="!bg-black !text-white" block>Order</Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="p-3 border">
          <Typography.Title level={5} className="!mt-3 text-center">Book a test Drive</Typography.Title>
          <Divider className="" />
          <BookATestDrive />
        </div>
      </div>
    </div>
  )
}