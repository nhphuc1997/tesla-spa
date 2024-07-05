import { PushpinOutlined, SendOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Descriptions, Divider, Form, Input, Radio, RadioChangeEvent, Row, Tooltip, Typography } from "antd";
import { useState } from "react";
import Payment from "../payment/Payment";

const NewCar = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Row gutter={16} className="py-3">
      <Col xs={24} md={14}>
        <div className="p-3 bg-white rounded-lg h-auto">
          <Carousel arrows className="" dots={false}>
            <div className="w-full bg-slate-500 h-96 rounded-lg" />
            <div className="w-full bg-slate-500 h-96 rounded-lg" />
            <div className="w-full bg-slate-500 h-96 rounded-lg" />
            <div className="w-full bg-slate-500 h-96 rounded-lg" />
          </Carousel>

          <div className="py-3">
            <Descriptions title="+ Thông số cơ bản:" bordered column={3} size="small" layout="vertical">
              <Descriptions.Item className="!pb-1" label="Tổng công suất">402mi</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Mô-men xoắn (Nm/vòng/phút)">130mph </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Tăng tốc (0-100 km/h)">3.1sec</Descriptions.Item>
            </Descriptions>
          </div>

          <div className="pb-3">
            <Descriptions title="+ Kích thước tổng thể (mm):" bordered column={5} size="small" layout="vertical">
              <Descriptions.Item className="!pb-1" label="Dài">4660</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Rộng">1865 </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Cao">1670</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chiều dài CS">2690</Descriptions.Item>
            </Descriptions>
          </div>

          <div className="pb-3">
            <Descriptions title="+ Động cơ:" bordered column={1} size="small" layout="horizontal">
              <Descriptions.Item className="!pb-1" label="Mã động cơ">A25A-FXS</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Loại">I4, 4 strokes</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Dung tích">2487 cm3</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Công suất cực đại">(140kw) 188hp/6000rpm</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Mô-men xoắn cực đại">(140kw) 188hp/6000rpm</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Tiêu chuẩn khí thải">EURO 6</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hộp số	">CVT</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hệ thống truyền động">AWD</Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chế độ lái	">Eco/Normal/Sport</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Col>

      <Col xs={24} md={10}>
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="pb-3">
            <Typography.Title level={4} className="text-center !mb-0">Model S</Typography.Title>
            <Typography.Text className="block text-center !pb-0"> Dẫn đầu xu hướng </Typography.Text>
            <Typography.Title level={3} className="!my-0 text-center md:text-left">
              <TagsOutlined className="mr-2" />700,000,000 VND
            </Typography.Title>
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="!mb-0 !pb-0">
              <PushpinOutlined className="mr-2" />
              Phụ kiện
            </Typography.Title>
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center !py-3">
              <div className="!py-3">
                <Typography.Title level={5}>Màu sơn</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1} className="!p-3 bg-slate-600 rounded-lg mr-3" />
                  <Radio value={2} className="!p-3 bg-slate-700 rounded-lg mr-3" />
                  <Radio value={3} className="!p-3 bg-slate-800 rounded-lg mr-3" />
                  <Radio value={4} className="!p-3 bg bg-slate-900 rounded-lg mr-3" />
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Wheels</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={5} className={`!p-3  rounded-lg ${value === 5 ? 'bg-slate-200' : ''}`}>
                    <Tooltip title="18'' Photon Wheels Included All-Season Tires Range (EPA est.) : 341mi.">
                      18''' Photon Wheels
                    </Tooltip>
                  </Radio>
                  <Radio value={6} className={`!p-3  rounded-lg ${value === 6 ? 'bg-slate-200' : ''}`}>
                    <Tooltip title="19'' Nova Wheels $1,000 All-Season Tires Range (est.) : 305mi">
                      19''' Nova Wheels
                    </Tooltip>
                  </Radio>
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Nội thất</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={7} className={`!p-3  rounded-lg ${value === 7 ? 'bg-slate-200' : ''}`}>
                    Trắng
                  </Radio>
                  <Radio value={8} className={`!p-3  rounded-lg ${value === 8 ? 'bg-slate-200' : ''}`}>
                    Đen
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="pb-3">
              <PushpinOutlined className="mr-2" />Đặt cọc
            </Typography.Title>
            <Payment />
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="pb-3">
              <PushpinOutlined className="mr-2" /> Đăng kí lái thử
            </Typography.Title>

            <div className="w-full md:w-3/4 mx-auto">
              <div className="p-3 border rounded-lg">
                <Form layout="vertical" name="wrap" colon={false}>
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input placeholder="user@gmail.com" />
                  </Form.Item>

                  <Form.Item label="Số diện thoại" name="Số điện thoại" rules={[{ required: true }]}>
                    <Input placeholder="0123456789" />
                  </Form.Item>

                  <Form.Item label="">
                    <Button block htmlType="submit" icon={<SendOutlined />} iconPosition="end">
                      Đăng kí
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row >
  );
};

export default NewCar;
