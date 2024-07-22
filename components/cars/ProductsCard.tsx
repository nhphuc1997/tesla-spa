"use client";
import { S3_URL } from "@/utils";
import { formatCurrency } from "@/utils/format-currency";
import {
  ApiOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  PicCenterOutlined,
  PushpinOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Divider, FloatButton, Row, Statistic, Tag, Tooltip } from "antd";
import { Image, Button, Typography } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  name?: string;
  isShowLoadMore?: boolean;
  itemPerRow?: number;
  data?: any;
}

const ProductsCard = ({
  isShowLoadMore = true,
  itemPerRow = 12,
  data = [],
}: Props) => {
  const router = useRouter();

  return (
    <>
      <Row className="w-full border-[0.5px]">
        {data?.data?.map((item: any, index: number) => (
          <Col
            xs={24}
            sm={12}
            md={itemPerRow}
            key={item.id}
            className="cursor-pointer border-[0.5px]"
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <div className={`p-3`}>
              <div className="hover:drop-shadow-lg">
                <Tooltip title={item?.shortDescription}>
                  <div
                    className="h-32 md:h-[40rem] bg-center bg-cover bg-no-repeat w-full"
                    style={{
                      backgroundImage: `url("${S3_URL}/${item?.s3Key}")`,
                    }}
                  />
                </Tooltip>

                <div className="cursor-pointer p-2 mt-[-4rem]">
                  <div className="w-full flex items-center">
                    <Tag className="!bg-black !text-white" bordered={false}>
                      2020
                    </Tag>

                    <Tag className="!bg-black !text-white" bordered={false}>
                      {`${item?.category?.name}`}
                    </Tag>
                  </div>

                  <div className="w-full flex items-center">
                    <Typography.Title
                      level={4}
                      className="!my-0 !truncate w-1/2 !text-white"
                    >
                      {item.name}
                    </Typography.Title>

                    <Typography.Title
                      level={5}
                      className="w-1/2 !my-0 hidden xl:flex justify-end items-center !text-white"
                    >
                      <PicCenterOutlined className="mr-2 font-semibold " />
                      SEAT {item.seat}
                    </Typography.Title>
                  </div>
                </div>

                <div className="flex justify-center items-center pt-3">
                  <Typography.Paragraph className="!my-0 font-thin px-3">
                    Price:
                  </Typography.Paragraph>
                  <Typography.Paragraph className="!my-0 font-semibold text-sm lg:!text-lg">
                    {formatCurrency(item.price)}
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {(() => {
        if (isShowLoadMore) {
          return (
            <Row className="py-3">
              <Col span={24} className="!flex justify-center items-center">
                <Button
                  shape="circle"
                  onClick={() => router.push("/products")}
                  icon={<ArrowDownOutlined />}
                />
              </Col>
            </Row>
          );
        }
      })()}

      <FloatButton.BackTop />
    </>
  );
};

export default ProductsCard;
