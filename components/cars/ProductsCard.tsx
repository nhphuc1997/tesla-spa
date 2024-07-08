"use client";
import { formatCurrency } from "@/utils/format-currency";
import {
  ApiOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  PicCenterOutlined,
  PushpinOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Row, Statistic, Tag, Tooltip } from "antd";
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
      <Row className="w-full p-3">
        {data?.data?.map((item: any) => (
          <Col xs={24} sm={12} md={itemPerRow} key={item.id} className="p-1">
            <div className="rounded-lg border hover:drop-shadow-2xl p-3 bg-white">
              <div>
                <Image
                  height={200}
                  fallback=""
                  className="rounded-lg"
                  src={item.thumbnail}
                  alt=""
                />
              </div>

              <div
                className="cursor-pointer"
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <div className="flex justify-start items-start flex-col xl:flex-row">
                  <Typography.Paragraph className="!mb-0">
                    <Tag
                      icon={<TagsOutlined />}
                      className="!bg-[rgba(41,41,41,.75)] !text-white"
                    >
                      {`${formatCurrency(item.price)}`}
                    </Tag>
                  </Typography.Paragraph>
                </div>

                <div className="w-full flex items-center">
                  <Tooltip title={item.color}>
                    <Typography.Title
                      level={5}
                      className="!my-0 !truncate w-1/2"
                    >
                      {item.name}
                    </Typography.Title>
                  </Tooltip>

                  <Typography.Paragraph className="w-1/2 !mb-0 hidden xl:flex justify-end items-center">
                    <PicCenterOutlined className="mr-2" />
                    {item.seat}
                  </Typography.Paragraph>
                </div>

                <div className="!truncate">
                  <Tooltip title={item.textIntro}>
                    <Typography.Text className="!mb-0 !truncate">
                      <PushpinOutlined className="mr-2" />
                      {item.textIntro}
                    </Typography.Text>
                  </Tooltip>
                </div>

                <div>
                  <Button
                    className="!bg-[#e6f4ff] !border-[#e6f4ff]"
                    block
                    onClick={() => router.push(`/products/${item.id}`)}
                    icon={<ApiOutlined />}
                  >
                    Xem ngay
                  </Button>
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
                  className="!bg-[#e6f4ff] !border-[#e6f4ff]"
                  onClick={() => router.push("/products")}
                  icon={<ArrowDownOutlined />}
                />
              </Col>
            </Row>
          );
        }
      })()}
    </>
  );
};

export default ProductsCard;
