import { LoginOutlined } from "@ant-design/icons";
import { SignedOut, useClerk, useUser } from "@clerk/nextjs";
import {
  Button,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  FormProps,
  Input,
  QRCode,
  Steps,
  Typography,
} from "antd";
import { useState } from "react";

type FieldType = {
  fullname?: string;
  phoneNumber?: string;
};

const Payment = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [current, setCurrent] = useState(0);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeV2 = (value: number) => {
    setCurrent(value);
  };

  return (
    <div>
      <Steps
        current={current}
        onChange={onChangeV2}
        items={[
          {
            title: "Bước 1",
            description: "Thông tin cá nhân",
            disabled: !isSignedIn,
          },
          {
            title: "Bước 2",
            description: "Thông tin thanh toán",
            disabled: !isSignedIn,
          },
          {
            title: "Bước 2",
            description: "Chuyển khoản",
            disabled: !isSignedIn,
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
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
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
                          <Descriptions.Item className="!pb-1" label="Số CCCD">
                            A25A-FXS
                          </Descriptions.Item>
                          <Descriptions.Item
                            className="!pb-1"
                            label="Họ và tên"
                          >
                            A25A-FXS
                          </Descriptions.Item>
                          <Descriptions.Item
                            className="!pb-1"
                            label="Ngày sinh"
                          >
                            I4, 4 strokes
                          </Descriptions.Item>
                          <Descriptions.Item className="!pb-1" label="Đia chỉ">
                            2487 cm3
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
