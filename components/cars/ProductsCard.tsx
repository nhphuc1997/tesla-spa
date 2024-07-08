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
          <Col xs={24} sm={12} md={itemPerRow} key={item.id} className="p-1 cursor-pointer" onClick={() => router.push(`/products/${item.id}`)}>
            <div className=" hover:drop-shadow-2xl p-6 bg-white border">
              <div className="p-6 border">
                <div
                  className="h-32 md:h-64 bg-center bg-cover bg-no-repeat  w-full "
                  style={{ backgroundImage: `url("${item?.thumbnail}")` }}
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

                  <div className="py-3">
                    <Button
                      className="!bg-black !border-black !text-white"
                      block
                      onClick={() => router.push(`/products/${item.id}`)}
                      icon={<ApiOutlined />}
                    >
                      Chi tiết
                    </Button>
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
                      Số ghé ngồi <Typography.Text className="ml-2 font-semibold">{item.seat}</Typography.Text>
                    </Typography.Paragraph>
                  </div>

                  <div className="flex justify-start flex-col !truncate">
                    <Tooltip title={item.textIntro}>
                      <Typography.Title level={5} className="!mb-0 !truncate">
                        <PushpinOutlined className="mr-2" />
                        {item.textIntro}
                      </Typography.Title>
                    </Tooltip>

                    <Tooltip title={item.textIntro}>
                      <Typography.Text className="!mb-0 !truncate">
                        <PushpinOutlined className="mr-2" />
                        {item?.shortDesciption}
                      </Typography.Text>
                    </Tooltip>
                  </div>

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
