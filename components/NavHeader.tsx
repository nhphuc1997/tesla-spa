'use client'
import { CloseCircleOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Col, Dropdown, Input, Menu, MenuProps, Row, Typography, Image } from 'antd';
import { useState } from "react";
import Link from "next/link";


type MenuItem = Required<MenuProps>['items'][number];

const menus: MenuItem[] = [
  {
    label: 'Honda',
    key: 'Honda',
  },
  {
    label: 'Tesla',
    key: 'Tesla',
  },
  {
    label: 'Lexus',
    key: 'Lexus',
  },
  {
    label: 'Vinfast',
    key: 'Vinfast',
  },
  {
    label: 'Mazda',
    key: 'Mazda',
  },
  {
    label: 'Mescerdes',
    key: 'Mescerdes',
  },
  {
    label: 'Benley',
    key: 'Benley',
  },
];

const NavHeader = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const items: MenuProps['items'] = [
    { label: <Link href="">Đăng kí / Đăng nhập</Link>, key: 1 },
  ];

  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Header className="px-3 sticky top-0 w-full flex items-center bg-white z-10 h-16">
      <Row className="w-full">
        <Col span={6}>
          <MenuOutlined />
        </Col>

        <Col span={12}>
          <div className="flex justify-center items-center">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />
          </div>
        </Col>

        <Col span={4} className="hidden md:block">
          <div className="flex justify-end items-center h-16">
            <Input
              placeholder="Tìm kiếm"
              suffix={<CloseCircleOutlined className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />}
            />
          </div>
        </Col>

        <Col span={2} className="">
          <div className="flex justify-end items-center h-16">
            <Dropdown menu={{ items }} trigger={['click']}>
              <UserOutlined />
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default NavHeader
