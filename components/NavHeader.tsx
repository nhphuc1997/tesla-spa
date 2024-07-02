'use client'
import { CloseCircleOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Col, Input, Row, Typography } from 'antd';
import { useState } from "react";
import { motion } from "framer-motion"

const NavHeader = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)

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
        <Col span={6} className="w-full flex justify-end items-center ">

          {(() => {
            if (showSearch === true) {
              return (
                <motion.div animate={{ x: -10 }}>
                  <Input
                    placeholder="Tìm kiếm"
                    suffix={<CloseCircleOutlined className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />}
                  />
                </motion.div>
              )
            }

            return (
              <SearchOutlined onClick={() => setShowSearch(!showSearch)} className="cursor-pointer" />
            )
          })()}
        </Col>
      </Row>
    </Header>
  )
}

export default NavHeader
