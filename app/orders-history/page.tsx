"use client";

import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";

const OrderHistoryPage: React.FC = () => {
  const [product, setProduct] = useState([{}]);
  const [opsColor, setOpsColor] = useState([{}]);
  const [opsWheel, setOpsWheel] = useState([{}]);
  const [opsInterator, setopsInterator] = useState([{}]);

  const orders = useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const response = await doGet("/orders");

      if (response?.statusCode === 200) {
        const infor = response?.data;

        setProduct(infor.map((item: any) => item?.product));
        setOpsColor(infor.map((item: any) => item?.optionColor));
        setOpsWheel(infor.map((item: any) => item?.optionWheel));
        setopsInterator(infor.map((item: any) => item?.optionInterator));
      }
    },
  });

  const expandedRowRender = () => {
    // product
    const columnsProduct = [
      { id: "Id sản phẩm", dataIndex: "id", key: "id" },
      { title: "Hình ảnh", dataIndex: "thumbnail", key: "thumbnail" },
      { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
      { title: "Giá tiền", dataIndex: "price", key: "price" },
      { title: "Loại sản phẩm", dataIndex: "kind", key: "kind" },
    ];

    // optionColor
    const columnsOptions = [
      { id: "Id sản phẩm", dataIndex: "id", key: "id" },
      { title: "Mô tả", dataIndex: "description", key: "description" },
      { title: "Giá tiền", dataIndex: "price", key: "price" },
    ];

    return (
      <>
        <Table
          columns={columnsProduct}
          dataSource={product}
          pagination={false}
        />
        <Table
          columns={columnsOptions}
          dataSource={opsColor}
          pagination={false}
        />
        <Table
          columns={columnsOptions}
          dataSource={opsWheel}
          pagination={false}
        />
        <Table
          columns={columnsOptions}
          dataSource={opsInterator}
          pagination={false}
        />
      </>
    );
  };

  const columns: TableColumnsType = [
    { title: "Đơn hàng số", dataIndex: "name", key: "name" },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={[{}]}
        bordered
      />
    </>
  );
};

export default OrderHistoryPage;
