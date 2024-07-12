"use client";
import { Col, Divider, Row, Typography } from "antd";

const TextIntro = () => {
  return (
    <Row className="w-full py-3">
      <Col span={24} className="">
        <Typography.Title level={5} className="!mb-0 px-4">
          AUCTIONS - ALL
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default TextIntro;
