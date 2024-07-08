"use client";
import { Col, Divider, Row, Typography } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slicker from "../Slicker";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";

const KindOfCar = () => {
  const { data } = useQuery({
    queryKey: ["customer-demands"],
    queryFn: async () => doGet("/customer-demands"),
  });

  console.log(data);

  return (
    <Row className="w-full py-3">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="right">
          <Typography.Title
            level={5}
            className="!mb-0 text-center md:text-left"
          >
            TÌM XE THEO NHU CẦU
          </Typography.Title>
        </Divider>
      </Col>
      <Col span={24} className="w-full">
        <Slicker
          desktopSlidesToScroll={1}
          desktopSlidesToShow={4}
          data={data?.data}
          autoPlay={true}
          type="block"
        />
      </Col>
    </Row>
  );
};

export default KindOfCar;
