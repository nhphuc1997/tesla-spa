"use client";
import { doGet } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  Descriptions,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { useDebounce } from "use-debounce";

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
    fixed: true,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
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
    fixed: true,
    render: (amount: number, record, index) => (
      <Typography.Text className="truncate" key={index}>
        {formatCurrency(amount)}
      </Typography.Text>
    ),
  },
  {
    key: "createAt",
    dataIndex: "createAt",
    title: "Create At",
    width: 100,
    fixed: true,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
        <Typography.Text ellipsis={true} className="w w-24">
          {formatDate(text)}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    key: "interior",
    dataIndex: "interior",
    title: "Interior",
    render: (element: any, record, index) => (
      <Descriptions key={index} column={1} className="!p-0 !m-0">
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
    render: (element: any, record, index) => (
      <Descriptions key={index} column={1} className="!p-0 !m-0">
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
    render: (element: any, record, index) => (
      <Descriptions key={index} column={1} className="!p-0 !m-0">
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
    render: (element: any, record, index) => (
      <Descriptions key={index} column={1} className="!p-0 !m-0">
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
];

export default function OrderHistory() {
  const { user } = useUser();

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [searchFilter] = useDebounce(searchTerm, 1000);

  useQuery({
    queryKey: ["order-history", [user, page, searchFilter, typeFilter]],
    queryFn: async () => {
      setLoading(true);
      const $filter: any = { userId: String(user?.id) };

      if (searchFilter && searchFilter !== "") {
        $filter["$or"] = [
          { orderId: { $cont: searchFilter } },
          { "product.name": { $cont: searchFilter } },
        ];
      }

      if (typeFilter && typeFilter !== "") {
        $filter["product.kind"] = typeFilter;
      }

      const response = await doGet("/orders", {
        s: JSON.stringify($filter),
        limit: 10,
        page: page,
        sort: "createAt,DESC",
      });

      if (response?.statusCode === 200) {
        setDataSource(response?.data?.data);
        setLoading(false);
        setTotalPage(response?.data?.total);
        return true;
      }

      setLoading(false);
      return false;
    },
  });

  return (
    <Spin
      spinning={loading}
      indicator={<Loading3QuartersOutlined spin style={{ color: "black" }} />}
    >
      <div className="py-1">
        <Row gutter={16} className="py-3">
          <Col xs={12} md={5}>
            <div className="py-1">
              <Input
                placeholder="order ID, car's name"
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="py-1">
              <Select
                value={typeFilter}
                style={{ width: "100%" }}
                placeholder="car's type"
                onChange={(e) => setTypeFilter(e)}
                options={[
                  { label: "OLD CAR", value: "OLD" },
                  { label: "NEW CAR", value: "NEW" },
                ]}
              />
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col span={24} className="px-6 border">
            <Table
              loading={loading}
              bordered={false}
              dataSource={dataSource}
              columns={ORDER_HISTORY_COLUMNS}
              pagination={false}
              scroll={{ y: 600, x: 1500 }}
            />
          </Col>
        </Row>

        <Row className="py-3">
          <Col span={24}>
            <div className="flex justify-center items-center">
              <Pagination
                onChange={(page) => setPage(page)}
                defaultCurrent={page}
                total={totalPage}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
