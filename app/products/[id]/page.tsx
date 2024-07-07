"use client";
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useState } from "react";
import OldCar from "@/components/cars/OldCar";
import NewCar from "@/components/cars/NewCar";

const OrderPage = () => {
  const [segment, setSegment] = useState<String>("NEW_CAR");

  return (
    <div className="py-3">
      <Breadcrumb
        items={[
          { title: <Link href="/">Trang chủ</Link> },
          { title: "Đặt hàng" },
        ]}
      />

      <Row gutter={16} className="pt-3">
        <Col span={24} className="w-full !flex justify-center items-center">
          <Segmented
            options={[
              { label: "Xe mới", value: "NEW_CAR", icon: <AppstoreOutlined /> },
              // { label: "Xe cũ", value: "OLD_CAR", icon: <BarsOutlined /> },
            ]}
            onChange={(value) => setSegment(value)}
          />
        </Col>
      </Row>

      {(() => {
        // if (segment === "OLD_CAR") {
        //   return <OldCar />;
        // }
        return <NewCar />;
      })()}
    </div>
  );
};

export default OrderPage;
