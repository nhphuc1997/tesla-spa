"use client";
import { Breadcrumb, Col, InputNumber, Row, Select, Typography } from "antd";
import Link from "next/link";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import OldCar from "@/components/OldCar";
import NewCar from "@/components/NewCar";

const Order = () => {
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

      {(() => {
        return <NewCar />;
      })()}

      <Row gutter={16}>
        <Col span={2} />
        <Col span={20}>
          <div className="bg-white p-3">
            <Typography.Title level={5}>Tính toán khoản vay</Typography.Title>
            <div className="flex items-center">
              <div className="w-1/2 p-3 bg-slate-100 rounded-lg">
                <Row gutter={16}>
                  <Col span={24} className="py-1">
                    <InputNumber className="w-full" placeholder="Giá xe" />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber
                      className="w-full"
                      placeholder="Khoản vay (% giá trị xe)"
                    />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber
                      className="w-full"
                      placeholder="Khoản vay (VND)"
                    />
                  </Col>
                  <Col span={12} className="py-1">
                    <InputNumber className="w-full" placeholder="Lãi suất" />
                  </Col>
                  <Col span={12} className="py-1">
                    <Select
                      className="w-full"
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
                  <Typography.Title level={4}>
                    Số tiền trả góp hàng tháng ước tính
                  </Typography.Title>

                  <div>
                    <Typography.Title level={5} className="text-center">
                      12,0000 VND/Tháng
                    </Typography.Title>
                    <Typography.Paragraph>
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
    </div>
  );
};

export default Order;
