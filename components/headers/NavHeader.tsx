'use client'
import { LoginOutlined, MenuOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Col, Dropdown, Input, Menu, MenuProps, Row, Typography, Button, Avatar, notification } from 'antd';
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";


type MenuItem = Required<MenuProps>['items'][number];


const NavHeader = () => {
  const { isSignedIn, user } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [api, contextHolder] = notification.useNotification();


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


  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="w-ful flex justify-center items-center">
          <SignedIn>
            <Typography.Text onClick={() => signOut()}>
              <LoginOutlined className="mr-2" />
              Đăng xuất
            </Typography.Text>
          </SignedIn>
        </div>
      ),
      key: '1',
    },
  ];


  useEffect(() => {
    if (isSignedIn === true) {
      api.success({ message: null, description: 'Đăng nhập thành công' })
    }

    if (isSignedIn === false) {
      api.success({ message: null, description: 'Đăng xuất thành công' })
    }
  }, [isSignedIn])

  return (
    <Header className="px-3 sticky top-0 w-full flex items-center !bg-white z-10 h-16">
      {contextHolder}
      <Row className="w-full">
        <Col span={6}>
          <div className="flex justify-start items-center h-16">
            <MenuOutlined />
          </div>
        </Col>

        <Col span={12}>
          <div className="flex justify-center items-center h-16">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />
          </div>
        </Col>

        <Col span={6} className="">
          <div className="flex justify-end items-center h-16">
            <SignedOut>
              <Button icon={<LoginOutlined />} iconPosition={"start"} onClick={() => openSignIn()}>
                Đăng nhập
              </Button>
            </SignedOut>

            <Dropdown menu={{ items }}>
              {(() => {
                if (user?.fullName) {
                  return (
                    <div className="flex justify-start items-center">
                      <Typography.Title level={5} className="mr-2 !mb-0">{user.fullName}</Typography.Title>
                      <Avatar src={user.imageUrl} className="border" />
                    </div>
                  )
                }
                return <Typography.Text />
              })()}
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default NavHeader
