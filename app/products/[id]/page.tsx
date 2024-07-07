"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import NewCar from "@/components/cars/NewCar";

const OrderPage = () => {
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
