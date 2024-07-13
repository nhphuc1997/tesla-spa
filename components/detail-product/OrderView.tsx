import { formatCurrency } from "@/utils/format-currency";
import { Button, Descriptions, Divider, Drawer, QRCode, Result, Steps, Typography } from "antd";
import BookATestDrive from "./BookATestDrive";
import { useState } from "react";
import FormOrder from "./forms/FormOrder";
import { STEPS } from "@/utils";
import { CarOutlined } from "@ant-design/icons";

export default function OrderView() {
  const [openDrawOrder, setOpenDrawOrder] = useState(false)
  const [personalInfor, setOpersonalInfor] = useState(false)
  const [currentStepOrder, setCurrentStepOrder] = useState<number>(0)


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
          <Button className="!bg-black !text-white" block onClick={() => setOpenDrawOrder(true)}>Order</Button>
        </div>

        <Drawer className="" closable={false} onClose={() => setOpenDrawOrder(false)} open={openDrawOrder} size="large">
          <div className="w-full">
            <Typography.Title level={5} className="!mt-3 text-center">Mescedes benz</Typography.Title>
            <div>
              <Descriptions title="" column={1}>
                <Descriptions.Item label="Material">Material</Descriptions.Item>
                <Descriptions.Item label="Exterior">Exterior</Descriptions.Item>
                <Descriptions.Item label="Interior">Exterior</Descriptions.Item>
                <Descriptions.Item label="Alloys">Alloys</Descriptions.Item>
                <Descriptions.Item label="Description">Description</Descriptions.Item>
              </Descriptions>
            </div>

            <Divider />

            <div className="">
              <Steps className="!py-5" current={currentStepOrder} items={STEPS} />
              {currentStepOrder === 0 && (
                <div>
                  <FormOrder
                    setOpersonalInfor={setOpersonalInfor}
                    setCurrentStepOrder={setCurrentStepOrder}
                  />
                </div>
              )}

              {currentStepOrder === 1 && (
                <div>
                  <div className="flex justify-center items-center">
                    <QRCode type="canvas" value="https://ant.design/" />
                  </div>
                  <div className="py-3" />
                  <div className="flex justify-center items-center">
                    <Button
                      className="!bg-black !text-white"
                      onClick={() => setCurrentStepOrder(2)}
                    >
                      Finished
                    </Button>
                  </div>
                </div>
              )}

              {currentStepOrder === 2 && (
                <Result
                  icon={<CarOutlined />}
                  title="Great, you have done all the operations!"
                />
              )}
            </div>
          </div>
        </Drawer>
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