'use client'
import { DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Col, Row, Space, Typography } from 'antd';

const NavHeader = () => {
  return (
    <Header className="px-3 sticky top-0 w-full flex items-center bg-white">
      <Row className="w-full">
        <Col span={6}>
          <div className="flex justify-start items-center">
            <DoubleRightOutlined />
          </div>
        </Col>
        <Col span={12}>
          <Typography.Title level={5} className="h-full text-center flex justify-center items-center !mb-0 text-sm md:text-md">
            SuperCar BlonDie
          </Typography.Title>
        </Col>
        <Col span={6}>
          <div className="flex justify-end items-center">
            <SearchOutlined />
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default NavHeader
