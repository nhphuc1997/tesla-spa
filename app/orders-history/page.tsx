'use client'
import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { Col, Input, Row, Select, Spin } from "antd"

export default function OrderHistory() {
  const { user } = useUser()

  useQuery({
    queryKey: ['order-history'],
    queryFn: async () => {

    }
  })

  return (
    <Spin spinning={false}>
      <div className="py-1">
        <Row gutter={16} className="py-3">
          <Col xs={24} md={5}>
            <div className="py-1">
              <Input
                placeholder="order ID, car's name"
                onChange={(e) => console.log('runn 1')}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="py-1">
              <Select
                style={{ width: "100%" }}
                placeholder="car's type"
                onChange={(e) => console.log('runn 2')}
                options={[
                  { label: "OLD CAR", value: "OLD" },
                  { label: "NEW CAR", value: "NEW" },
                ]}
              />
            </div>
          </Col>
        </Row>

      </div>
    </Spin>
  )
}
