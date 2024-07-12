"use client";
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import {
  Col,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  Typography,
  Button,
  Avatar,
  notification,
} from "antd";
import { useEffect } from "react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const NavHeader = () => {
  const { isSignedIn, user } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === true) {
      api.success({ message: null, description: "Đăng nhập thành công" });
    }
  }, [isSignedIn, api]);

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="w-ful flex justify-center items-center">
          <SignedIn>
            <Typography.Text onClick={() => signOut()}>
              <LoginOutlined className="mr-2" />
              Sign Out
            </Typography.Text>
          </SignedIn>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="w-ful flex justify-center items-center"
          onClick={() => router.push("/orders-history")}
        >
          <Typography.Text>
            <MenuFoldOutlined className="mr-2" />
            Lịch sử đặt cọc
          </Typography.Text>
        </div>
      ),
      key: "2",
    },
  ];

  return (
    <Header className="border-b !px-3 sticky top-0 w-full flex items-center !bg-white z-10 h-16">
      {contextHolder}
      <Row className="w-full">
        <Col
          span={6}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        >
          <div className="flex justify-start items-center h-16">
            <MenuOutlined />
          </div>
        </Col>

        <Col span={12}>
          <div className="h-16 flex justify-center items-center cursor-pointer">
            <Typography.Title
              className="!mb-0"
              level={5}
              onClick={() => router.push("/")}
            >
              SUPER CAR
            </Typography.Title>
          </div>
        </Col>

        <Col span={6} className="">
          <div className="flex justify-end items-center h-16">
            <SignedOut>
              <Button
                icon={<LoginOutlined />}
                iconPosition={"start"}
                onClick={() => openSignIn()}
              >
                Sign In
              </Button>
            </SignedOut>

            <Dropdown menu={{ items }}>
              {(() => {
                if (user?.fullName) {
                  return (
                    <div className="flex justify-start items-center">
                      <Typography.Title level={5} className="mr-2 !mb-0">
                        {user.fullName}
                      </Typography.Title>
                      <Avatar src={user.imageUrl} className="border" />
                    </div>
                  );
                }
                return <Typography.Text />;
              })()}
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default NavHeader;
