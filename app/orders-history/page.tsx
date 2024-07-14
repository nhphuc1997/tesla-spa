"use client";
import { doGet } from "@/utils/doMethod";
import { ORDER_HISTORY_COLUMNS } from "@/utils/order-history.colums";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Col, Input, Row, Select, Spin, Table } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

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

        <Row>
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
