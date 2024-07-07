import { PushpinOutlined, SendOutlined, TagsOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import Payment from "../payment/Payment";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";
import Slicker from "../Slicker";
import { useUser } from "@clerk/nextjs";

const NewCar = () => {
  const params = useParams();

  const [bonusPrice, setBonusPrice] = useState(0);
  const [opsColorPicked, setOpsColorPicked] = useState<string>("");
  const [opsWheelPicked, setOpsWheelPicked] = useState<string>("");
  const [opsInteratorPicked, setOpsInteratorPicked] = useState<string>("");

  const { data }: any = useQuery({
    queryKey: ["detail-product"],
    queryFn: async () => {
      const products = await doGet(`/products/${params?.id}`);
      const categoryId = products?.data?.category?.id;

      if (categoryId) {
        const category = await doGet(`/categories/${categoryId}`);
        return {
          products: products,
          category: category,
        };
      }

      return {
        products: products,
        category: null,
      };
    },
  });

  const colorPick = (e: RadioChangeEvent) => {
    setBonusPrice(e.target.value);
  };

  const wheelPick = (e: RadioChangeEvent) => {
    setBonusPrice(e.target.value);
  };

  const interatorPick = (e: RadioChangeEvent) => {
    setBonusPrice(e.target.value);
  };

  return (
    <Row gutter={16} className="py-3">
      <Col xs={24} md={14}>
        <div className="p-3 h-auto w-full bg-white rounded-lg">
          <div className="mx-3">
            <Slicker
              desktopSlidesToScroll={1}
              desktopSlidesToShow={1}
              alowMaxHeight={true}
              autoPlay={true}
              data={data?.products?.data.images}
              showChild={true}
            />
          </div>

          <Divider className="!my-1" />

          <div className="py-3">
            <Descriptions
              title="+ Thông số cơ bản:"
              bordered
              column={3}
              size="small"
              layout="vertical"
            >
              <Descriptions.Item className="!pb-1" label="Tổng công suất">
                {data?.products?.data?.productBasicParam.total_capacity}
              </Descriptions.Item>
              <Descriptions.Item
                className="!pb-1"
                label="Mô-men xoắn (Nm/vòng/phút)"
              >
                {data?.products?.data?.productBasicParam.acceleration}
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
                {data?.products?.data?.productBasicSize.length}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Rộng">
                {data?.products?.data?.productBasicSize.width}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Cao">
                {data?.products?.data?.productBasicSize.height}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chiều dài CS">
                {data?.products?.data?.productBasicSize.widthBasic}
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
                {data?.products?.data?.productBasicEngine.code}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Loại">
                {data?.products?.data?.productBasicEngine.type}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Dung tích">
                {data?.products?.data?.productBasicEngine.displacementVol}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Công suất cực đại">
                {data?.products?.data?.productBasicEngine.maxRound}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Mô-men xoắn cực đại">
                {data?.products?.data?.productBasicEngine.maxMoment}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Tiêu chuẩn khí thải">
                {data?.products?.data?.productBasicEngine.standH2O}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hộp số">
                {data?.products?.data?.productBasicEngine.code}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Hệ thống truyền động">
                {data?.products?.data?.productBasicEngine.moveSystem}
              </Descriptions.Item>
              <Descriptions.Item className="!pb-1" label="Chế độ lái">
                {data?.products?.data?.productBasicEngine.driverMode}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Col>

      <Col xs={24} md={10}>
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="pb-3">
            <Typography.Title level={4} className="text-center !mb-0 uppercase">
              {data?.products?.data.name}
            </Typography.Title>
            <Typography.Text className="block text-center !pb-0">
              {data?.products?.data?.textIntro}
            </Typography.Text>

            <Typography.Text className="">
              Màu sắc: {data?.products?.data.color}
            </Typography.Text>

            <Typography.Title
              level={3}
              className="!my-0 text-center md:text-left"
            >
              <TagsOutlined className="mr-2" />
              {formatCurrency(
                Number(data?.products?.data?.price) + Number(bonusPrice)
              )}
            </Typography.Title>
          </div>

          <Divider />

          <div className="w-full">
            <Typography.Title level={5} className="!mb-0 !pb-0">
              <PushpinOutlined className="mr-2" />
              Phiên bản
            </Typography.Title>
            <div className="flex flex-col justify-center items-start !py-3">
              <div className="!py-3">
                <Typography.Title level={5}>Màu sơn</Typography.Title>
                <Radio.Group onChange={colorPick}>
                  {data?.category?.data?.optionColor.map((color: any) => (
                    <Radio
                      className="!py-1"
                      value={color?.price}
                      onClick={() => setOpsColorPicked(color?.description)}
                    >
                      {color?.description}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Wheels</Typography.Title>
                <Radio.Group onChange={wheelPick}>
                  {data?.category?.data?.optionWheel.map((wheel: any) => (
                    <Radio
                      className="!py-1"
                      value={wheel?.price}
                      onClick={() => setOpsWheelPicked(wheel?.description)}
                    >
                      {wheel?.description}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Nội thất</Typography.Title>
                <Radio.Group onChange={interatorPick}>
                  {data?.category?.data?.optionInterator.map(
                    (interator: any) => (
                      <Radio
                        className="!py-1"
                        value={interator?.price}
                        onClick={() =>
                          setOpsInteratorPicked(interator?.description)
                        }
                      >
                        {interator?.description}
                      </Radio>
                    )
                  )}
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
            <Payment
              productName={data?.products?.data.name}
              productPrice={data?.products?.data.price}
              total={formatCurrency(
                Number(data?.products?.data?.price) + Number(bonusPrice)
              )}
              bonusPrice={bonusPrice}
              color={opsColorPicked}
              wheel={opsWheelPicked}
              interator={opsInteratorPicked}
            />
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
