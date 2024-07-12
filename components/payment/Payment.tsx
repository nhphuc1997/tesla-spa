import { doPost } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";
import {
  CheckCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { SignedOut, useClerk, useUser } from "@clerk/nextjs";
import {
  Button,
  Descriptions,
  Empty,
  Form,
  FormProps,
  Input,
  QRCode,
  Steps,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v4 } from "uuid";

type FieldType = {
  fullName?: string;
  phoneNumber?: string;
};

interface Props {
  productName: string;
  productPrice: string;
  productId: string;
  total: string;
  color: any;
  wheel: any;
  interator: any;
}

const Payment = ({
  productName,
  productPrice,
  productId,
  total,
  color,
  wheel,
  interator,
}: Props) => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const buttonRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const [userInfor, setUserInfor] = useState<FieldType>();

  const onChangeStep = (value: number) => {
    setCurrent(value);
  };

  const moveNextStep = () => {
    if (current === 0 && buttonRef && buttonRef?.current) {
      buttonRef?.current.click();
      return;
    }

    setCurrent(current + 1);
    return;
  };

  const onFinishForm: FormProps<FieldType>["onFinish"] = (values) => {
    setCurrent(current + 1);
    setUserInfor({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
    });
  };

  const submitOrder = async () => {
    const payload = {
      orderId: v4(),
      userId: user?.id,
      phoneNumber: userInfor?.phoneNumber,
      productId: productId,
      optionColorId: color?.id,
      optionWheelId: wheel?.id,
      optionInteratorId: interator?.id,
    };

    const response = await doPost("/orders", payload);
    if (response?.statusCode === 200) {
      return router.push(`/result?order_id=${response?.data?.id}`);
    }
  };

  return (
    <div>
      <Steps
        current={current}
        onChange={onChangeStep}
        items={[
          {
            title: "Bước 1",
            description: "Thông tin cá nhân",
            disabled: true,
          },
          {
            title: "Bước 2",
            description: "Thông tin thanh toán",
            disabled: current === 0 || !isSignedIn,
          },
          {
            title: "Bước 2",
            description: "Chuyển khoản",
            disabled: current === 0 || !isSignedIn,
          },
        ]}
      />

      {(() => {
        if (isSignedIn) {
          return (
            <div className="steps">
              {(() => {
                if (current === 0)
                  return (
                    <div className="m-auto p-5 my-6 rounded-md">
                      <Form
                        labelCol={{ flex: "100px" }}
                        labelAlign="left"
                        name="basic"
                        autoComplete="off"
                        onFinish={onFinishForm}
                      >
                        <Form.Item
                          label="Họ tên"
                          name="fullName"
                          rules={[
                            {
                              required: true,
                              message: "Thông tin này không được để trống",
                            },
                          ]}
                        >
                          <Input placeholder="Nguyễn Văn A" />
                        </Form.Item>

                        <Form.Item
                          label="SĐT"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "Thông tin này không được để trống",
                            },
                          ]}
                        >
                          <Input placeholder="0123428123" />
                        </Form.Item>

                        <Button
                          ref={buttonRef}
                          type="primary"
                          htmlType="submit"
                          className="!hidden"
                        />
                      </Form>
                    </div>
                  );

                if (current === 1) {
                  return (
                    <div className="my-3">
                      <div className="p-3 border rounded-lg">
                        <Descriptions
                          title="Thông tin khách hàng"
                          column={{ xs: 1, md: 2 }}
                          size="small"
                          layout="horizontal"
                        >
                          <Descriptions.Item className="!pb-1" label="Họ tên">
                            {userInfor?.fullName}
                          </Descriptions.Item>
                          <Descriptions.Item
                            className="!pb-1"
                            label="Số điện thoại"
                          >
                            {userInfor?.phoneNumber}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>

                      <div className="py-3">
                        <div className="p-3 border rounded-lg">
                          <Descriptions
                            title="Thông tin sản phẩm"
                            column={1}
                            size="small"
                            layout="horizontal"
                          >
                            <Descriptions.Item
                              className="!pb-1"
                              label="Sản phẩm"
                            >
                              {productName}
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1"
                              label="Giá niêm yết"
                            >
                              {formatCurrency(productPrice)}
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1"
                              label="Phụ kiện"
                            >
                              <ul>
                                <li>
                                  Màu sắc:
                                  <Typography.Text className="ml-2 font-semibold">
                                    {color?.description}
                                  </Typography.Text>
                                </li>
                                <li>
                                  Wheel:
                                  <Typography.Text className="ml-2 font-semibold">
                                    {wheel?.description}
                                  </Typography.Text>
                                </li>
                                <li>
                                  Nội thất:
                                  <Typography.Text className="ml-2 font-semibold">
                                    {interator?.description}
                                  </Typography.Text>
                                </li>
                              </ul>
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1 text-right font-bold"
                              label="Thành tiền"
                            >
                              {total}
                            </Descriptions.Item>
                          </Descriptions>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (current === 2) {
                  return (
                    <div>
                      <div className="my-3 flex justify-center items-center">
                        <Typography.Title level={5}>
                          Thông tin chuyển khoản
                        </Typography.Title>
                      </div>
                      <div className="my-3 w-full flex justify-center items-center">
                        <QRCode type="canvas" value="2" />
                      </div>
                      <div className="w-full flex justify-center items-center flex-col">
                        <Typography.Title level={5} className="!m-0 !pb-1">
                          Ngân Hàng: VCB
                        </Typography.Title>
                        <Typography.Title level={5} className="!m-0 !pb-1">
                          PGD: Đào Tấn
                        </Typography.Title>
                      </div>
                    </div>
                  );
                }
              })()}

              <div className="w-full">
                {current === 2 && (
                  <div className="w-1/2 mx-auto">
                    <Button
                      icon={<CheckCircleOutlined />}
                      block
                      onClick={() => submitOrder()}
                      className="!bg-[#e6f4ff] !border-[#e6f4ff] text-black"
                    >
                      Hoàn thành
                    </Button>
                  </div>
                )}

                <div className="flex justify-end items-center">
                  {current > 0 && (
                    <Button
                      shape="circle"
                      icon={
                        <DoubleLeftOutlined
                          onClick={() => setCurrent(current - 1)}
                        />
                      }
                    />
                  )}

                  <div className="px-1" />

                  {current < 2 && (
                    <Button
                      shape="circle"
                      icon={<DoubleRightOutlined onClick={moveNextStep} />}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="w-full flex justify-center items-center py-3">
            <Empty
              description={
                <div className="flex justify-center items-center flex-col">
                  <Typography.Text className="pb-3">
                    Đăng nhập để tiếp tục
                  </Typography.Text>
                  <SignedOut>
                    <Button
                      icon={<LoginOutlined />}
                      iconPosition={"start"}
                      onClick={() => openSignIn()}
                    >
                      Đăng nhập
                    </Button>
                  </SignedOut>
                </div>
              }
            />
          </div>
        );
      })()}
    </div>
  );
};

export default Payment;
