import { CarOutlined, CheckOutlined, DoubleRightOutlined, InfoCircleOutlined, PercentageOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Divider, InputNumber, Modal, notification, Row, Select, Tag, Typography } from "antd";
import { useState } from "react";
import Payment from "../payment/Payment";

const OldCar = () => {
  const [api, contextHolder] = notification.useNotification();

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNotification = () => {
    api.success({
      message: `Thành công`,
      description: 'Chúc mừng bạn đã đặt hàng thành công',
      placement: 'top',
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    openNotification();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={16} className="py-3">
        <Col span={2} />
        <Col xs={24} md={20}>
          <div className="w-full flex">
            <div className="w-full md:w-1/2 bg-white">
              <div className="p-3">
                <Carousel arrows infinite={false} dots={false}>
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
            <div className="w-1/2 bg-white rounded-lg">
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
                  <Button className="my-1" block onClick={showModal}>
                    Mua ngay
                  </Button>

                  <Modal
                    title="Thanh toán"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={720}
                    footer={[
                      <Button key="submit" onClick={handleOk}>
                        Hoàn tất
                      </Button>,
                    ]}
                  >
                    <Payment />
                  </Modal>
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
          <div className="bg-white p-3 rounded-lg">
            <Typography.Title level={5}>Tính toán khoản vay</Typography.Title>
            <div className="flex items-center">
              <div className="w-1/2 p-3 border rounded-lg">
                <Row gutter={16}>
                  <Col span={24} className="py-1">
                    <InputNumber className="!w-full" placeholder="Giá xe" />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber
                      className="!w-full"
                      placeholder="Khoản vay (% giá trị xe)"
                    />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber
                      className="!w-full"
                      placeholder="Khoản vay (VND)"
                    />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber className="!w-full" placeholder="Lãi suất" />
                  </Col>
                  <Col span={12} className="py-1">
                    <Select
                      className="!w-full"
                      showSearch
                      placeholder="Thời gian vay"
                      options={[
                        { value: "1", label: "Jack" },
                        { value: "2", label: "Lucy" },
                        { value: "3", label: "Tom" },
                      ]}
                    />
                  </Col>
                </Row>
              </div>
              <div className="w-1/2 p-3">
                <div className="flex justify-center items-center flex-col">
                  <Typography.Title level={4} className="text-center">
                    Số tiền trả góp hàng tháng ước tính
                  </Typography.Title>

                  <div>
                    <Typography.Title level={5} className="text-center">
                      12,0000 VND/Tháng
                    </Typography.Title>
                    <Typography.Paragraph className="text-center">
                      Trả trước: 800,000,000 VND
                    </Typography.Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
};

export default OldCar;
