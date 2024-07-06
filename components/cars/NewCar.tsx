import { PushpinOutlined, SendOutlined, TagsOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import Payment from "../payment/Payment";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";

const NewCar = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["detail-product"],
    queryFn: async () => doGet(`/products/${params?.id}`),
  });

  console.log(data?.data, "data");

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
            <Descriptions
              title="+ Thông số cơ bản:"
              bordered
              column={3}
              size="small"
              layout="vertical"
            >
              <Descriptions.Item className="!pb-1" label="Tổng công suất">
                {data?.data?.productBasicParam.total_capacity}
              </Descriptions.Item>
              <Descriptions.Item
                className="!pb-1"
                label="Mô-men xoắn (Nm/vòng/phút)"
              >
                {data?.data?.productBasicParam.acceleration}
              </Descriptions.Item>
              <Descriptions.Item
                className="!pb-1"
                label="Tăng tốc (0-100 km/h)"
              >
                3.1sec
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div className="pb-3">
            <Descriptions
              title="+ Kích thước tổng thể (mm):"
              bordered
              column={5}
              size="small"
              layout="vertical"
            >
              <Descriptions.Item className="!pb-1" label="Dài">
                {data?.data?.productBasicSize.length}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Rộng">
                {data?.data?.productBasicSize.width}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Cao">
                {data?.data?.productBasicSize.height}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chiều dài CS">
                {data?.data?.productBasicSize.widthBasic}
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div className="pb-3">
            <Descriptions
              title="+ Động cơ:"
              bordered
              column={1}
              size="small"
              layout="horizontal"
            >
              <Descriptions.Item className="!pb-1" label="Mã động cơ">
                {data?.data?.productBasicEngine.code}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Loại">
                {data?.data?.productBasicEngine.type}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Dung tích">
                {data?.data?.productBasicEngine.displacementVol}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Công suất cực đại">
                {data?.data?.productBasicEngine.maxRound}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Mô-men xoắn cực đại">
                {data?.data?.productBasicEngine.maxMoment}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Tiêu chuẩn khí thải">
                {data?.data?.productBasicEngine.standH2O}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hộp số">
                {data?.data?.productBasicEngine.code}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hệ thống truyền động">
                {data?.data?.productBasicEngine.moveSystem}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chế độ lái">
                {data?.data?.productBasicEngine.driverMode}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Col>

      <Col xs={24} md={10}>
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="pb-3">
            <Typography.Title level={4} className="text-center !mb-0 uppercase">
              {data?.data.name}
            </Typography.Title>
            <Typography.Text className="block text-center !pb-0">
              {data?.data?.textIntro}
            </Typography.Text>
            <Typography.Title
              level={3}
              className="!my-0 text-center md:text-left"
            >
              <TagsOutlined className="mr-2" />
              {formatCurrency(data?.data?.price)}
            </Typography.Title>
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="!mb-0 !pb-0">
              <PushpinOutlined className="mr-2" />
              Phụ kiện
            </Typography.Title>
            <div className="flex flex-col justify-center items-start !py-3">
              <div className="!py-3">
                <Typography.Title level={5}>Màu sơn</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio
                    value={1}
                    className="!p-3 bg-slate-600 rounded-lg mr-3"
                  />
                  <Radio
                    value={2}
                    className="!p-3 bg-slate-700 rounded-lg mr-3"
                  />
                  <Radio
                    value={3}
                    className="!p-3 bg-slate-800 rounded-lg mr-3"
                  />
                  <Radio
                    value={4}
                    className="!p-3 bg bg-slate-900 rounded-lg mr-3"
                  />
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Wheels</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio
                    value={5}
                    className={`!p-3  rounded-lg ${
                      value === 5 ? "bg-slate-200" : ""
                    }`}
                  >
                    <Tooltip title="18'' Photon Wheels Included All-Season Tires Range (EPA est.) : 341mi.">
                      18''' Photon Wheels
                    </Tooltip>
                  </Radio>
                  <Radio
                    value={6}
                    className={`!p-3  rounded-lg ${
                      value === 6 ? "bg-slate-200" : ""
                    }`}
                  >
                    <Tooltip title="19'' Nova Wheels $1,000 All-Season Tires Range (est.) : 305mi">
                      19''' Nova Wheels
                    </Tooltip>
                  </Radio>
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Nội thất</Typography.Title>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio
                    value={7}
                    className={`!p-3  rounded-lg ${
                      value === 7 ? "bg-slate-200" : ""
                    }`}
                  >
                    Trắng
                  </Radio>
                  <Radio
                    value={8}
                    className={`!p-3  rounded-lg ${
                      value === 8 ? "bg-slate-200" : ""
                    }`}
                  >
                    Đen
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="pb-3">
              <PushpinOutlined className="mr-2" />
              Đặt cọc
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
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="user@gmail.com" />
                  </Form.Item>

                  <Form.Item
                    label="Số diện thoại"
                    name="Số điện thoại"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="0123456789" />
                  </Form.Item>

                  <Form.Item label="">
                    <Button
                      block
                      htmlType="submit"
                      icon={<SendOutlined />}
                      iconPosition="end"
                    >
                      Đăng kí
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default NewCar;
