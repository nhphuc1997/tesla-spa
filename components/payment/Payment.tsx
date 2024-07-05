import { DatePicker, Descriptions, Form, FormProps, Input, QRCode, Steps, Typography } from "antd";
import { useState } from "react";

type FieldType = {
  fullname?: string;
  address?: string;
  dob?: string;
  identityCard?: string;
};

const Payment = () => {
  const [current, setCurrent] = useState(0);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          { title: 'Bước 1', description: 'Thông tin cá nhân' },
          { title: 'Bước 2', description: 'Thông tin thanh toán' },
          { title: 'Bước 2', description: 'Chuyển khoản' },
        ]}
      />

      <div className="steps">
        {(() => {
          if (current === 0) return (
            <div className="w-3/4 m-auto p-5 border my-6 rounded-md">
              <Form
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Số CCCD"
                  name="identityCard"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="123345567" />
                </Form.Item>

                <Form.Item
                  label="Họ và tên"
                  name="fullname"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>

                <Form.Item
                  label="Ngày sinh"
                  name="dob"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item
                  label="Đia chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input placeholder="Ba Đình, Hà Nội" />
                </Form.Item>
              </Form>
            </div>
          )

          if (current === 1) {
            return (
              <div className="my-3">
                <div className="p-3 border rounded-lg">
                  <Descriptions title="Thông tin khách hàng" column={{ xs: 1, md: 2 }} size="small" layout="horizontal">
                    <Descriptions.Item className="!pb-1" label="Số CCCD">A25A-FXS</Descriptions.Item>
                    <Descriptions.Item className="!pb-1" label="Họ và tên">A25A-FXS</Descriptions.Item>
                    <Descriptions.Item className="!pb-1" label="Ngày sinh">I4, 4 strokes</Descriptions.Item>
                    <Descriptions.Item className="!pb-1" label="Đia chỉ">2487 cm3</Descriptions.Item>
                  </Descriptions>
                </div>

                <div className="py-3">
                  <div className="p-3 border rounded-lg">
                    <Descriptions title="Thông tin sản phẩm" column={1} size="small" layout="horizontal">
                      <Descriptions.Item className="!pb-1" label="Sản phẩm">
                        Modeal S
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Giá niêm yết">700,000,000 VND</Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Phụ kiện">
                        <ul>
                          <li>Màu sơn (#endregion)</li>
                          <li>Wheels (18'' Photon Wheels)</li>
                          <li>Nội thất(#Trắng)</li>
                        </ul>
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1 text-right font-bold" label="Thành tiền">
                        750,000,000 VND
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </div>
              </div>
            )
          }

          if (current === 2) {
            return (
              <div>
                <div className="my-3 flex justify-center items-center">
                  <Typography.Title level={5}>Thông tin chuyển khoản</Typography.Title>
                </div>
                <div className="my-3 w-full flex justify-center items-center">
                  <QRCode type="canvas" value="2" />
                </div>
              </div>
            )
          }
        })()}
      </div>
    </div>
  )
}

export default Payment
