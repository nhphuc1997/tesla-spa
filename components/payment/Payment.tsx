import {
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
import { useRef, useState } from "react";

type FieldType = {
  fullName?: string;
  phoneNumber?: string;
};

const Payment = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
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
    console.log("Success:", values);
    setCurrent(current + 1);
    setUserInfor({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
    });
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
                    <div className="w-3/4 m-auto p-5 border my-6 rounded-md">
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
                              message: "Please input your username!",
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
                              message: "Please input your username!",
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
                              Modeal S
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1"
                              label="Giá niêm yết"
                            >
                              700,000,000 VND
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1"
                              label="Phụ kiện"
                            >
                              <ul>
                                <li>Màu sơn (#endregion)</li>
                                <li>Wheels (18'' Photon Wheels)</li>
                                <li>Nội thất(#Trắng)</li>
                              </ul>
                            </Descriptions.Item>
                            <Descriptions.Item
                              className="!pb-1 text-right font-bold"
                              label="Thành tiền"
                            >
                              750,000,000 VND
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
                    </div>
                  );
                }
              })()}
              <div className="w-full flex justify-end items-center">
                {current < 0 && (
                  <Button
                    shape="circle"
                    icon={<DoubleLeftOutlined />}
                    onClick={moveNextStep}
                  />
                )}
                <div className="px-3" />
                {current < 2 && (
                  <Button
                    shape="circle"
                    icon={<DoubleRightOutlined onClick={moveNextStep} />}
                  />
                )}
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
