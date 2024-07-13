"use client";
import NewCar from "@/components/cars/NewCar";
import Alloys from "@/components/detail-product/Alloys";
import Description from "@/components/detail-product/Description";
import ExteriorColor from "@/components/detail-product/ExteriorColor";
import MaterialCombination from "@/components/detail-product/MaterialCombine";
import TechnicalData from "@/components/detail-product/TechnicalData";
import { S3_URL } from "@/utils";
import { doGet } from "@/utils/doMethod";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Descriptions, DescriptionsProps, Divider, Image, notification, Row, Segmented, Typography } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const DetailPage = () => {
  const params = useParams();
  const [api, contextHolder] = notification.useNotification();

  const [images, setImages] = useState<any>([]);
  const [basicParams, setBasicParams] = useState<any>({});

  const products = useQuery({
    queryKey: ['detail-product'], queryFn: async () => {
      const response = await doGet(`/products/${params?.id}`);

      if (response?.statusCode === 200) {
        setImages(response?.data?.images)
        setBasicParams(response?.data?.productBasicParam)
      }
    }
  })

  return (
    <div className="py-3 w-full">
      <Row gutter={8}>
        <Col xs={24} md={18} >
          <Row gutter={8}>
            <Col xs={24} md={16} className="pb-3">
              <Carousel arrows className="">
                {images?.length > 0 && images?.map((item: any) => (
                  <div className={`h-[25rem]`} key={item.id}>
                    <div
                      className="bg-center bg-cover bg-no-repeat h-full bg-gray-100"
                      style={{ backgroundImage: `url("${S3_URL}/${item.s3Key}")` }}
                    />
                  </div>
                ))}
              </Carousel>
            </Col>

            <Col xs={24} md={8} className="!hidden md:!block  pb-3">
              <div
                className="bg-center bg-cover bg-no-repeat h-[12rem] bg-gray-200"
                style={{ backgroundImage: `url("${S3_URL}/${images[0]?.s3Key}")` }}
              />
              <Divider className="!my-[0.5rem]" />
              <div
                className="bg-center bg-cover bg-no-repeat h-[12rem] bg-gray-200"
                style={{ backgroundImage: `url("${S3_URL}/${images[0]?.s3Key}")` }}
              />
            </Col>
          </Row>

          <div className="py-3">
            <Typography.Title level={5}>Configuration Overview</Typography.Title>
            <Segmented className="!hidden lg:!block" options={["Technical data", 'Material combination', "Exterior Color", 'Alloys', 'Description']} block />
          </div>

          <div className="min-h-24">
            {/* <TechnicalData basicParams={basicParams} /> */}
            {/* <MaterialCombination /> */}
            {/* <ExteriorColor /> */}
            {/* <Alloys /> */}
            <Description />
          </div>
        </Col>

        <Col xs={24} md={6} >1</Col>
      </Row>
    </div>
  );
};

export default DetailPage;
