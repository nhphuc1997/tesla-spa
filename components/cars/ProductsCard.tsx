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
import { useRouter } from "next/navigation";

interface Props {
  name?: string;
  isShowLoadMore?: boolean;
  itemPerRow?: number;
  data?: any;
}

const ProductsCard = ({
  isShowLoadMore = true,
  itemPerRow = 4,
  data = [],
}: Props) => {
  const router = useRouter();

  return (
    <>
      <Row className="w-full border-l border-r">
        {data?.data?.map((item: any) => (
          <>
            <Col
              xs={24}
              sm={12}
              md={itemPerRow}
              key={item.id}
              className=" cursor-pointer border-r border-b border-t"
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <div className=" hover:drop-shadow-2xl p-4 bg-white">
                <div className="">
                  <div
                    className="h-32 md:h-96 bg-center bg-cover bg-no-repeat  w-full "
                    style={{
                      backgroundImage: `url("${S3_URL}/${item?.s3Key}")`,
                    }}
                  />
                  <div className="cursor-pointer">
                    <div className="flex justify-between items-start flex-col xl:flex-row py-2">
                      <Tag
                        icon={<TagsOutlined />}
                        className="!bg-[#e6f4ff] !border-[#e6f4ff]"
                      >
                        {`${formatCurrency(item.price)}`}
                      </Tag>

                      <Tag
                        icon={<TagsOutlined />}
                        className="!bg-[#e6f4ff] !border-[#e6f4ff] capitalize"
                      >
                        {`${item?.category?.name}`}
                      </Tag>
                    </div>

                    <div className="w-full flex items-center">
                      <Tooltip title={item.color}>
                        <Typography.Title
                          level={4}
                          className="!my-0 !truncate w-1/2"
                        >
                          {item.name}
                        </Typography.Title>
                      </Tooltip>

                      <Typography.Paragraph className="w-1/2 !mb-0 hidden xl:flex justify-end items-center">
                        <PicCenterOutlined className="mr-2 font-semibold" />
                        SEAT{" "}
                        <Typography.Text className="ml-2 font-semibold">
                          {item.seat}
                        </Typography.Text>
                      </Typography.Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </>
        ))}
      </Row>

      {(() => {
        if (isShowLoadMore) {
          return (
            <Row className="py-3">
              <Col span={24} className="!flex justify-center items-center">
                <Button
                  shape="circle"
                  className="!bg-[#e6f4ff] !border-[#e6f4ff]"
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
