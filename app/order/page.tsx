"use client";
import { Breadcrumb, Col, InputNumber, Row, Select, Typography } from "antd";
import Link from "next/link";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import OldCar from "@/components/OldCar";
import NewCar from "@/components/NewCar";
import { useState } from "react";

const Order = () => {
  const [segment, setSegment] = useState<String>('NEW_CAR')

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
              { label: "Xe mới", value: "NEW_CAR", icon: <AppstoreOutlined /> },
              { label: "Xe cũ", value: "OLD_CAR", icon: <BarsOutlined /> },
            ]}
            onChange={(value) => setSegment(value)}
          />
        </Col>
      </Row>

      {(() => {
        if (segment === 'OLD_CAR') return <OldCar />
        return <NewCar />;
      })()}
    </div>
  );
};

export default Order;
