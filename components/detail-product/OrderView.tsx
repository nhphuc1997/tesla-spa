import { formatCurrency } from "@/utils/format-currency";
import {
  Button,
  Checkbox,
  Descriptions,
  Divider,
  Drawer,
  Modal,
  QRCode,
  Result,
  Steps,
  Typography,
  Image,
  Empty,
  notification,
} from "antd";
import BookATestDrive from "./BookATestDrive";
import { useEffect, useState } from "react";
import FormOrder from "./forms/FormOrder";
import { S3_URL, STEPS } from "@/utils";
import { CarOutlined } from "@ant-design/icons";
import Slicker from "../Slicker";
import { useStore } from "@/stores/products.store";
import { useClerk, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { doPost } from "@/utils/doMethod";

export default function OrderView() {
  const productStore = useStore((state: any) => state);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [api, contextHolder] = notification.useNotification();

  const orderMutation = useMutation({
    mutationKey: ["order-process"],
    mutationFn: async (payload: any) => {
      return await doPost("/orders", payload);
    },
    onSuccess(data) {
      if (data?.statusCode === 200) {
        api.open({
          message: "",
          description: `Order ${productStore.currentProductName} successfully`,
        });
        setCurrentStepOrder(2);
      }
    },
    onError() {
      api.open({
        message: "",
        description: `Order ${productStore.currentProductName} failed`,
      });
      setCurrentStepOrder(1);
    },
  });

  const [openDrawOrder, setOpenDrawOrder] = useState(false);
  const [openModalBookATestDrive, setOpenModalBookATestDrive] = useState(false);
  const [payloadProcessOrder, setPayloadProcessOrder] = useState(null);
  const [currentStepOrder, setCurrentStepOrder] = useState<number>(0);

  const finishOrder = () => {
    if (payloadProcessOrder) {
      orderMutation.mutate(payloadProcessOrder);
    }
  };

  useEffect(() => {
    productStore.setCurrentProductPriceTotal(
      Number(productStore.currentProductPrice) +
        Number(productStore.currentExterior?.price) +
        Number(productStore.currentInterior?.price) +
        Number(productStore.currentAlloy?.price) +
        Number(
          productStore.currentMaterial.reduce(
            (total: number, element: any) => total + element?.price,
            0
          )
        )
    );
  }, [
    productStore.currentProductPrice,
    productStore.currentExterior?.price,
    productStore.currentInterior?.price,
    productStore.currentAlloy?.price,
  ]);

  return (
    <>
      {contextHolder}
      <div className="">
        <div className="p-3 border">
          <Typography.Title level={5} className="!mt-3 text-center">
            {productStore.currentProductName}
          </Typography.Title>
          <Divider className="" />
          <div>
            <Descriptions title="" column={1} layout="vertical">
              <Descriptions.Item label="Price">
                <Typography.Text className="!font-bold">
                  Cost: {formatCurrency(productStore.currentProductPrice)} *
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item label="Material">
                <div>
                  {productStore.currentMaterial.map((item: any) => (
                    <div key={item.id}>
                      <Typography.Text className="!font-bold">
                        Cost: {formatCurrency(item?.price)}
                      </Typography.Text>
                      <Checkbox indeterminate defaultChecked={true} disabled>
                        <Typography.Text className="!font-semibold">
                          {item?.name}
                        </Typography.Text>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
              title=""
              column={{ xs: 1, md: 1, lg: 1, xl: 3 }}
              layout="vertical"
            >
              <Descriptions.Item label="Exterior">
                <div className="flex flex-col justify-start items-start">
                  <Typography.Text className="!font-bold">
                    Cost: {formatCurrency(productStore.currentExterior?.price)}
                  </Typography.Text>
                  <Image
                    preview={false}
                    width={80}
                    height={80}
                    src={`${S3_URL}/${productStore.currentExterior?.s3Key}`}
                    alt=""
                  />
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Interior">
                <div className="flex flex-col justify-start items-start">
                  <Typography.Text className="!font-bold">
                    Cost: {formatCurrency(productStore.currentInterior?.price)}
                  </Typography.Text>
                  <Image
                    preview={false}
                    width={80}
                    height={80}
                    src={`${S3_URL}/${productStore.currentInterior?.s3Key}`}
                    alt=""
                  />
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Alloys">
                <div className="flex flex-col justify-start items-start">
                  <Typography.Text className="!font-bold">
                    Cost: {formatCurrency(productStore.currentAlloy?.price)}
                  </Typography.Text>
                  <Image
                    preview={false}
                    width={80}
                    height={80}
                    src={`${S3_URL}/${productStore.currentAlloy?.s3Key}`}
                    alt=""
                  />
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>
          <Divider className="" />
          <div>
            <Typography.Title level={5} className="text-right">
              TOTAL: {formatCurrency(productStore.currentProductPriceTotal)}
            </Typography.Title>
          </div>

          {(() => {
            if (isSignedIn) {
              return (
                <div className="flex justify-end items-center">
                  <Button
                    className="!bg-black !text-white"
                    onClick={() => setOpenModalBookATestDrive(true)}
                  >
                    Book A Test Drive
                  </Button>

                  <Button
                    className="!bg-black !text-white"
                    onClick={() => setOpenDrawOrder(true)}
                  >
                    Order
                  </Button>
                </div>
              );
            }

            return (
              <Empty
                description={
                  <div className="flex justify-center items-center flex-col">
                    <Typography.Text>
                      You have to login to perform this action
                    </Typography.Text>
                    <Button
                      className="!bg-black !text-white"
                      onClick={() => openSignIn()}
                    >
                      Sign In
                    </Button>
                  </div>
                }
              />
            );
          })()}
        </div>

        <Modal
          title="Book A Test Drive"
          open={openModalBookATestDrive}
          onCancel={() => setOpenModalBookATestDrive(false)}
          footer={null}
        >
          <BookATestDrive />
        </Modal>

        <Drawer
          className=""
          closable={false}
          onClose={() => setOpenDrawOrder(false)}
          open={openDrawOrder}
          size="large"
        >
          <div className="w-full">
            <div className="pb-3">
              <Typography.Title level={5} className="text-center">
                Order Process
              </Typography.Title>
            </div>
            <div className="!pb-3">
              <Steps
                className="!py-3"
                current={currentStepOrder}
                items={STEPS}
              />
              {currentStepOrder === 0 && (
                <div className="w-3/4 mx-auto">
                  <FormOrder
                    setPayloadProcessOrder={setPayloadProcessOrder}
                    setCurrentStepOrder={setCurrentStepOrder}
                  />
                </div>
              )}

              <Divider />

              {currentStepOrder === 1 && (
                <div>
                  <div className="flex justify-center items-center">
                    <QRCode type="canvas" value="https://ant.design/" />
                  </div>
                  <div className="py-3" />
                  <div className="flex justify-center items-center">
                    <Button
                      className="!bg-black !text-white"
                      onClick={() => finishOrder()}
                    >
                      Finished
                    </Button>
                  </div>
                </div>
              )}

              {currentStepOrder === 2 && (
                <Result
                  icon={<CarOutlined />}
                  title={
                    <div>
                      <Typography.Title level={5}>
                        Great, you have done all the operations!
                      </Typography.Title>
                      <Button
                        className="!bg-black !text-white"
                        onClick={() => {
                          setCurrentStepOrder(0);
                          setOpenDrawOrder(false);
                        }}
                      >
                        Done
                      </Button>
                    </div>
                  }
                />
              )}
            </div>

            <div className="min-h-60 bg-slate-200">
              <Slicker
                desktopSlidesToScroll={1}
                desktopSlidesToShow={1}
                alowMaxHeight={true}
                autoPlay={true}
                data={productStore.currentProductImages}
                centerMode={false}
              />
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
