"use client";
import NewCar from "@/components/cars/NewCar";
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
        </Col>
        <Col xs={24} md={6} >1</Col>
      </Row>

      <Row>
        <Col xs={24} md={18} >
          <div className="py-3">
            <Typography.Title level={5}>Configuration Overview</Typography.Title>
            <Segmented options={["Technical data", "Exterior Color", 'Material combination', 'Exterior paint finishes', 'Alloys', 'Description']} block />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={18} >
          <div className="p-10 border">
            <div className="pb-3">
              <Descriptions title="Performance" column={{ xs: 1, md: 3 }}>
                <Descriptions.Item label="Max. output">{basicParams.total_capacity}</Descriptions.Item>
                <Descriptions.Item label="Top speed">{basicParams.moment}</Descriptions.Item>
                <Descriptions.Item label="Acceleration ">{basicParams.acceleration}</Descriptions.Item>
              </Descriptions>
            </div>

            <div className="pb-3">
              <Descriptions title="Weights" column={{ xs: 1, md: 2 }}>
                <Descriptions.Item label="Unladen weight">{basicParams.total_capacity}</Descriptions.Item>
                <Descriptions.Item label="Gross weight limit">{basicParams.total_capacity}</Descriptions.Item>
                <Descriptions.Item label="Roof load limit/nose weight limit">{basicParams.total_capacity}</Descriptions.Item>
              </Descriptions>
            </div>

            <div className="pb-3">
              <Descriptions title="Trailer Weight Limit" column={{ xs: 1, md: 3 }}>
                <Descriptions.Item label="Unbraked">{basicParams.total_capacity}</Descriptions.Item>
                <Descriptions.Item label="At 12% gradient">{basicParams.total_capacity}</Descriptions.Item>
                <Descriptions.Item label="At 8% gradient">{basicParams.total_capacity}</Descriptions.Item>
              </Descriptions>
            </div>

            <div className="pb-3">
              <Descriptions title="Volumes" column={{ xs: 1, md: 3 }}>
                <Descriptions.Item label="Luggage compartment">{basicParams.total_capacity}</Descriptions.Item>
              </Descriptions>
            </div>

            <div className="">
              <Descriptions title="Driveline" column={{ xs: 1, md: 3 }}>
                <Descriptions.Item label="Transmission">{basicParams.total_capacity}</Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailPage;
