"use client";
import { Col, Divider, Row, Typography } from "antd";

const TextIntro = () => {
  return (
    <Row className="w-full py-3 px-4 border-l border-r">
      <Col span={24} className="flex items-center w-full justify-center">
        <Typography.Title level={5} className="!mb-0 text-center md:text-left">
          AUCTIONS - ALL
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default TextIntro;
