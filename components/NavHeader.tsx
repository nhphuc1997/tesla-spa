'use client'
import { CloseCircleOutlined, DownOutlined, MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Col, Dropdown, Input, MenuProps, Row, Space, Typography } from 'antd';
import { useState } from "react";
import Link from "next/link";


const NavHeader = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const items: MenuProps['items'] = [
    { label: <Link href="">Đăng kí / Đăng nhập</Link>, key: 1 },
  ];

  return (
    <Header className="px-3 sticky top-0 w-full flex items-center bg-white z-10">
      <Row className="w-full">
        <Col span={6} className="flex justify-start items-center">
          <MenuOutlined />
        </Col>
        <Col span={12}>
          <Typography.Title level={5} className="h-full text-center flex justify-center items-center !mb-0 text-sm md:text-md">
            SuperCar
          </Typography.Title>
        </Col>
        <Col span={5} className="w-full flex justify-end items-center ">

          <Input
            placeholder="Tìm kiếm"
            suffix={<CloseCircleOutlined className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />}
          />
        </Col>

        <Col span={1} className="w-full flex justify-end items-center ">
          <Dropdown menu={{ items }} trigger={['click']}>
            <UserOutlined />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}

export default NavHeader
