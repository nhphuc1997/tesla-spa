'use client'
import { Col, Divider, Row, Typography } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slicker from "../Slicker";

const KindOfCar = () => {

  return (
    <Row className="w-full py-3 cursor-pointer">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="right">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            TÌM XE THEO NHU CẦU
          </Typography.Title>
        </Divider>
      </Col>
      <Col span={24} className="w-full">
        <Slicker desktopSlidesToScroll={6} desktopSlidesToShow={6} />
      </Col>
    </Row >
  )
}

export default KindOfCar;
