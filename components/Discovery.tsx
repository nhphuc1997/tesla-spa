'use client'
import {  SafetyCertificateOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Typography } from "antd";

const Discovery = () => {
  return (
    <Row className="w-full py-3">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="left">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            KHÁM PHÁ DANH MỤC XE
          </Typography.Title>
        </Divider>
      </Col>
      <Col span={24} className="flex items-start justify-start flex-col md:justify-center md:flex-row md:items-center">
        {
          ['Mitsubishi', 'Toyota', 'Vinfast', 'Audi', 'BMW'].map(item => (
            <div className="px-16 md:px-3">
              <SafetyCertificateOutlined className="px-1" />
              <Typography.Text>{item}</Typography.Text>
            </div>
          ))
        }
      </Col>
    </Row >
  )
}

export default Discovery;
