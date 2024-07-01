import { CheckCircleOutlined, EyeOutlined, ImportOutlined, InfoCircleOutlined, InfoOutlined, PushpinOutlined, TagsOutlined } from "@ant-design/icons";
import { Col, Row, Tag, Tooltip } from "antd";
import { Image, Rate, Typography } from 'antd';

const ProductsCard = () => {
  return (
    <Row className="h-full w-full p-2">
      {
        [1, 1, 2, 3, 4, 1].map(item => (
          <Col xs={24} sm={12} md={4} key={item} className="p-1">
            <div className="p-2 rounded-lg border hover:drop-shadow-2xl cursor-pointer">
              <div className="">
                <Image className="rounded-lg" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </div>
              <div className="">
                <div className="flex justify-start items-start flex-col lg:flex-row">
                  <Typography.Paragraph className="!mb-0">
                    <Tag icon={<ImportOutlined />} className="bg-[rgba(41,41,41,.75)] text-white">
                      Gemany
                    </Tag>
                  </Typography.Paragraph>
                  <Typography.Paragraph className="!mb-0">
                    <Tag icon={<TagsOutlined />} className="bg-[rgba(41,41,41,.75)] text-white">
                      5,000$
                    </Tag>
                  </Typography.Paragraph>
                </div>

                <div className="flex justify-between items-center">
                  <Tooltip title="prompt text">
                    <Typography.Title level={4} className="!my-0 truncate">
                      Aston Martin
                    </Typography.Title>
                  </Tooltip>

                  <Typography.Paragraph className="!mb-0">
                    12 <EyeOutlined className="text-xs px-1" />
                  </Typography.Paragraph>
                </div>

                <div>
                  <Tooltip title="prompt text">
                    <Typography.Paragraph className="!mb-0 truncate">
                      <PushpinOutlined /> DB4 Series V Vantage
                    </Typography.Paragraph>
                  </Tooltip>
                </div>

              </div>
            </div>
          </Col>
        ))
      }
    </Row>
  )
}

export default ProductsCard;
