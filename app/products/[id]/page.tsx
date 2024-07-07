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
          { title: "Chi tiết" },
        ]}
      />
      <NewCar />
    </div>
  );
};

export default OrderPage;
