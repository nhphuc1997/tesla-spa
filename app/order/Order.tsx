"use client";
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Divider,
  Row,
  Tag,
  Typography,
} from "antd";
import Link from "next/link";
import { Segmented } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  CarOutlined,
  CheckOutlined,
  DoubleRightOutlined,
  InfoCircleOutlined,
  PercentageOutlined,
  TagsOutlined,
} from "@ant-design/icons";

export const Order = () => {
  const data_1 = [
    "Hồ sơ pháp lý an toàn",
    "Không tai nạn lớn hoặc nghiêm trọng",
    "Kiểm tra toàn diện 207 điểm",
  ];

  const data_2 = [
    "Không có dấu hiệu cháy nổ",
    "Không ngập nước hoặc thuỷ kích",
    "CHUẨN ODO",
  ];

  return (
    <div className="py-3">
      <Breadcrumb
        items={[
          { title: <Link href="/">Trang chủ</Link> },
          { title: "Đặt hàng" },
        ]}
      />

      <Row gutter={16} className="pt-3">
        <Col span={24} className="w-full flex justify-center items-center">
          <Segmented
            options={[
              { label: "Xe cũ", value: "OLD_CAR", icon: <BarsOutlined /> },
              { label: "Xe mới", value: "NEW_CAR", icon: <AppstoreOutlined /> },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={16} className="py-3">
        <Col span={2} />
        <Col span={20}>
          <div className="w-full flex">
            <div className="w-1/2 bg-white">
              <div className="p-3">
                <Carousel arrows infinite={false}>
                  <div className="bg-slate-300 h-96 w-full rounded-lg" />
                  <div className="bg-slate-300 h-96 w-full rounded-lg" />
                  <div className="bg-slate-300 h-96 w-full rounded-lg" />
                </Carousel>
              </div>

              <div className="w-full p-3 bg-white">
                <div className="flex justify-start items-center py-1">
                  <Typography.Text>
                    Đạt chuẩn Xe 5 TỐT <InfoCircleOutlined />
                  </Typography.Text>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-[#f4f4f4] rounded-lg">
                  <ul>
                    {data_1.map((item) => (
                      <li>
                        <Typography.Text>
                          <DoubleRightOutlined /> {item}
                        </Typography.Text>
                      </li>
                    ))}
                  </ul>

                  <ul>
                    {data_2.map((item) => (
                      <li>
                        <Typography.Text>
                          <DoubleRightOutlined /> {item}
                        </Typography.Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-white">
              <div className="p-3">
                <div className="py-1 tag-product flex justify-start items-center">
                  <Tag color="success">Xe 5 tốt</Tag>
                  <Tag color="processing">Chuẩn odoo</Tag>
                </div>

                <div className="py-1">
                  <Typography.Title level={5} className="truncate">
                    <CarOutlined className="pr-2" />
                    Kia K5 2.0 Premium 2022 Siêu Lướt 9,800km Đẹp Keng
                  </Typography.Title>
                </div>

                <div className="name-product py-1">
                  <InfoCircleOutlined className="pr-2" />
                  <Typography.Text className="pr-2">
                    Năm sản xuất:{" "}
                    <span className="font-bold text-gray-500">2022</span>
                  </Typography.Text>
                  <Typography.Text className="pr-2">
                    Số km đã đi:{" "}
                    <span className="font-bold text-gray-500">49,000km</span>
                  </Typography.Text>
                  <Typography.Text className="pr-2">
                    Nhiên liệu:{" "}
                    <span className="font-bold text-gray-500">Xăng</span>
                  </Typography.Text>
                </div>

                <Divider />

                <div className="py-1">
                  <Typography.Title level={4}>
                    <TagsOutlined className="pr-2" />
                    Giá niêm yết: 400000 VND
                  </Typography.Title>
                  <Typography.Text>
                    <PercentageOutlined className="pr-2" />
                    Trả góp từ 7,8 triệu/tháng
                  </Typography.Text>
                </div>

                <div className="py-1 w-full">
                  <Button className="my-1" block>
                    Đặt cọc
                  </Button>
                  <Button className="my-1" block>
                    Mua ngay
                  </Button>
                </div>
                <Divider />

                <div>
                  <Typography.Title level={5}>
                    Chính sách & ưu đãi nổi bật
                  </Typography.Title>
                  <Typography.Paragraph className="!mb-0">
                    <CheckOutlined className="pr-2" />
                    Quà tặng hấp dẫn trong tháng
                  </Typography.Paragraph>
                  <Typography.Paragraph className="!mb-0">
                    <CheckOutlined className="pr-2" />
                    Bao kiểm tra hãng
                  </Typography.Paragraph>
                  <Typography.Paragraph className="!mb-0">
                    <CheckOutlined className="pr-2" />
                    Hỗ trợ vay ngân hàng đến 70%
                  </Typography.Paragraph>
                  <Typography.Paragraph className="!mb-0">
                    <CheckOutlined className="pr-2" />
                    Hỗ trợ trả góp từ 36 đến 84 tháng
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={2} />
      </Row>

      <Row gutter={16}>
        <Col span={2} />
        <Col span={20}>
          <div className="bg-white p-3">
            <Typography.Title level={5}>Tính toán khoản vay</Typography.Title>
            <div className="flex items-center">
              <div className="w-1/2 p-3 bg-slate-200 rounded-lg">
                <NumericInput placeholder="Outlined" />
              </div>
              <div className="w-1/2 p-3">2</div>
            </div>
          </div>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
};
