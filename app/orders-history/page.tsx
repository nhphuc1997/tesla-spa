"use client";
import { doGet } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  Descriptions,
  Input,
  Row,
  Select,
  Spin,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

interface DataType {
  key: string;
  orderId: string;
  amount: number;
  interior: Record<string, any>;
  exterior: Record<string, any>;
  alloy: Record<string, any>;
  product: Record<string, any>;
  createAt: string;
  type: string;
}

const ORDER_HISTORY_COLUMNS: TableProps<DataType>["columns"] = [
  {
    key: "orderId",
    dataIndex: "orderId",
    title: "order ID",
    width: 100,
    render: (text: string) => (
      <Tooltip title={text}>
        <Typography.Text ellipsis={true} className="w w-24">
          {text}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "Amount",
    width: 100,
    render: (amount: number) => (
      <Typography.Text className="truncate">
        {formatCurrency(amount)}
      </Typography.Text>
    ),
  },
  {
    key: "interior",
    dataIndex: "interior",
    title: "Interior",
    render: (element: any) => (
      <Descriptions column={1} className="!p-0 !m-0">
        <Descriptions.Item label="Name" className="!p-0 truncate">
          <Tooltip placement="topLeft" title={element?.name}>
            {element?.name}
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="Cost">
          {formatCurrency(element?.price)}
        </Descriptions.Item>
      </Descriptions>
    ),
  },
  {
    key: "exterior",
    dataIndex: "exterior",
    title: "Exterior",
    render: (element: any) => (
      <Descriptions column={1} className="!p-0 !m-0">
        <Descriptions.Item label="Name" className="!p-0 truncate">
          <Tooltip placement="topLeft" title={element?.name}>
            {element?.name}
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="Cost">
          {formatCurrency(element?.price)}
        </Descriptions.Item>
      </Descriptions>
    ),
  },
  {
    key: "alloy",
    dataIndex: "alloy",
    title: "Alloy",
    render: (element: any) => (
      <Descriptions column={1} className="!p-0 !m-0">
        <Descriptions.Item label="Name" className="!p-0 truncate">
          <Tooltip placement="topLeft" title={element?.name}>
            {element?.name}
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="Cost">
          {formatCurrency(element?.price)}
        </Descriptions.Item>
      </Descriptions>
    ),
  },
  {
    key: "product",
    dataIndex: "product",
    title: "Product",
    render: (element: any) => (
      <Descriptions column={1} className="!p-0 !m-0">
        <Descriptions.Item label="Name" className="!p-0 truncate">
          <Tooltip placement="topLeft" title={element?.name}>
            {element?.name}
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="Cost" className="!p-0">
          {formatCurrency(element?.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          <Tag className="!bg-black !text-white">{element?.kind}</Tag>
        </Descriptions.Item>
      </Descriptions>
    ),
  },
  {
    key: "createAt",
    dataIndex: "createAt",
    title: "Create At",
    width: 100,
    render: (text: string) => (
      <Tooltip title={text}>
        <Typography.Text ellipsis={true} className="w w-24">
          {formatDate(text)}
        </Typography.Text>
      </Tooltip>
    ),
  },
];

export default function OrderHistory() {
  const { user } = useUser();

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useQuery({
    queryKey: ["order-history", [user]],
    queryFn: async () => {
      setLoading(true);
      const query = { userId: String(user?.id) };
      const response = await doGet("/orders", { s: JSON.stringify(query) });

      if (response?.statusCode === 200) {
        setDataSource(response?.data);
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    },
  });

  return (
    <Spin spinning={false}>
      <div className="py-1">
        <Row gutter={16} className="py-3">
          <Col xs={24} md={5}>
            <div className="py-1">
              <Input
                placeholder="order ID, car's name"
                onChange={(e) => console.log("runn 1")}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="py-1">
              <Select
                style={{ width: "100%" }}
                placeholder="car's type"
                onChange={(e) => console.log("runn 2")}
                options={[
                  { label: "OLD CAR", value: "OLD" },
                  { label: "NEW CAR", value: "NEW" },
                ]}
              />
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col span={24}>
            <Table
              loading={loading}
              bordered={true}
              pagination={false}
              dataSource={dataSource}
              columns={ORDER_HISTORY_COLUMNS}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
