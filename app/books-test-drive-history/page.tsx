"use client";
import { doGet } from "@/utils/doMethod";
import { formatDate } from "@/utils/format-date";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  Descriptions,
  Input,
  Pagination,
  Row,
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
  bookId: string;
  contactNumber: string;
  distanceRadius: string;
  pickedDate: string;
  product: any;
  createAt: any;
}

const COLUMNS: TableProps<DataType>["columns"] = [
  {
    key: "bookId",
    dataIndex: "bookId",
    title: "Book ID",
    fixed: true,
    width: 200,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
        <Typography.Text ellipsis={true} className="w">
          {text}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    key: "contactNumber",
    dataIndex: "contactNumber",
    title: "Contact number",
    width: 200,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
        <Typography.Text ellipsis={true} className="w w-24">
          {text}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    key: "distanceRadius",
    dataIndex: "distanceRadius",
    title: "Distance radius",
    width: 200,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
        <Typography.Text ellipsis={true} className="w w-24">
          {text}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    key: "pickedDate",
    dataIndex: "pickedDate",
    title: "Date",
    width: 200,
    render: (text: string, record, index) => (
      <Tooltip title={text} key={index}>
        <Typography.Text ellipsis={true} className="">
          {formatDate(text)}
        </Typography.Text>
      </Tooltip>
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
        <Descriptions.Item label="Seat" className="!p-0">
          {element?.seat}
        </Descriptions.Item>
        <Descriptions.Item label="manufactureYear">
          <Tag className="!bg-black !text-white">
            {element?.manufactureYear}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    ),
  },
];

export default function BookTestDriveHistory() {
  const { user } = useUser();

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchFilter] = useDebounce(searchTerm, 1000);

  useQuery({
    queryKey: ["book-test-drive-history", [user, page, searchFilter]],
    queryFn: async () => {
      setLoading(true);
      const $filter: any = { userId: String(user?.id) };

      if (searchFilter && searchFilter !== "") {
        $filter["$or"] = [
          { bookId: { $cont: searchFilter } },
          { "product.name": { $cont: searchFilter } },
        ];
      }

      const response = await doGet("/book-test-drive", {
        s: JSON.stringify($filter),
        limit: 10,
        page: page,
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
    <Spin spinning={false}>
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
        </Row>

        <Row className="">
          <Col span={24} className="px-6 border">
            <Table
              loading={loading}
              bordered={false}
              dataSource={dataSource}
              columns={COLUMNS}
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
