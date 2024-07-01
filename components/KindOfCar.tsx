'use client'
import { Col, Divider, Row, Typography } from "antd";

const KindOfCar = () => {

  return (
    <Row className="w-full py-3 cursor-pointer">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="right">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            THÔNG TIN CÁC DÒNG XE
          </Typography.Title>
        </Divider>
      </Col>
      <Col span={24} className="w-full">
        1
      </Col>
    </Row >
  )
}

export default KindOfCar;
