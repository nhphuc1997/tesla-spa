"use client";
import Alloy from "@/components/detail-product/Alloy";
import Description from "@/components/detail-product/DescriptionPane";
import ExteriorColor from "@/components/detail-product/ExteriorColor";
import InteriorColor from "@/components/detail-product/InteriorColor";
import MaterialCombination from "@/components/detail-product/MaterialCombine";
import OrderView from "@/components/detail-product/OrderView";
import TechnicalData from "@/components/detail-product/TechnicalData";
import { S3_URL } from "@/utils";
import { doGet } from "@/utils/doMethod";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  Col,
  Divider,
  notification,
  Row,
  Segmented,
  Typography,
} from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const DetailPage = () => {
  const params = useParams();
  const [api, contextHolder] = notification.useNotification();

  const [images, setImages] = useState<any>([]);
  const [technical, setTechnical] = useState<any>({});
  const [description, setDescription] = useState<any>("");
  const [material, setMaterial] = useState<any>([]);
  const [exterior, setExterior] = useState<any>([]);
  const [interior, setInterior] = useState<any>([]);
  const [alloy, setAlloy] = useState<any>([]);
  const [segment, setSegment] = useState<string>("Technical");

  useQuery({
    queryKey: ["detail-product"],
    queryFn: async () => {
      const product = await doGet(`/products/${params?.id}`);

      if (product?.statusCode === 200) {
        setImages(product?.data?.images);
        setTechnical(product?.data?.technical);
        setDescription(product?.data?.description)

        const category = await doGet(`/categories/${product?.data.categoryId}`)
        if (category?.statusCode === 200) {
          setMaterial(category?.data?.material)
          setExterior(category?.data?.exterior)
          setInterior(category?.data?.interior)
          setAlloy(category?.data?.alloy)
        }
      }
    },
  });

  return (
    <div className="py-3 w-full">
      <Row gutter={8}>
        <Col xs={24} md={18}>
          <Row gutter={8}>
            <Col xs={24} md={16} className="pb-3">
              <Carousel arrows className="">
                {images?.length > 0 &&
                  images?.map((item: any) => (
                    <div className={`h-[25rem]`} key={item?.id}>
                      <div
                        className="bg-center bg-cover bg-no-repeat h-full bg-gray-100"
                        style={{ backgroundImage: `url("${S3_URL}/${item?.s3Key}")` }}
                      />
                    </div>
                  ))}
              </Carousel>
            </Col>

            <Col xs={24} md={8} className="!hidden md:!block  pb-3">
              <div
                className="bg-center bg-cover bg-no-repeat h-[12rem] bg-gray-200"
                style={{
                  backgroundImage: `url("${S3_URL}/${interior[0]?.s3Key}")`,
                }}
              />
              <Divider className="!my-[0.5rem]" />
              <div
                className="bg-center bg-cover bg-no-repeat h-[12rem] bg-gray-200"
                style={{
                  backgroundImage: `url("${S3_URL}/${material[0]?.s3Key}")`,
                }}
              />
            </Col>
          </Row>

          <div className="py-3">
            <Typography.Title level={5}>
              Configuration Overview
            </Typography.Title>
            <Segmented
              onChange={(value) => setSegment(value)}
              className="!hidden lg:!block"
              options={[
                "Technical",
                "Material",
                "Exterior",
                "Interior",
                "Alloys",
                "Description",
              ]}
              block
            />
          </div>

          <div className="min-h-24">
            {(() => {
              if (segment === "Technical") {
                return <TechnicalData technical={technical} />;
              }
              if (segment === "Material") {
                return <MaterialCombination material={material} />;
              }
              if (segment === "Exterior") {
                return <ExteriorColor exterior={exterior} />;
              }
              if (segment === "Interior") {
                return <InteriorColor interior={interior} />;
              }
              if (segment === "Alloys") {
                return <Alloy alloy={alloy} />;
              }
              if (segment === "Description") return <Description description={description} />;
            })()}
          </div>
        </Col>

        <Col xs={24} md={6}>
          <OrderView />
        </Col>
      </Row>
    </div>
  );
};

export default DetailPage;
