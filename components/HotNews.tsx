import { Col, Divider, Row, Typography, Statistic } from "antd";
import { Image } from "antd";

const HotNews = () => {
  return (
    <Row className="py-3">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="left">
          <Typography.Title
            level={5}
            className="!mb-0 text-center md:text-left"
          >
            DÒNG XE NỔI BẬT
          </Typography.Title>
        </Divider>
      </Col>

      <Image.PreviewGroup>
        <Col xs={24} sm={8} className="rounded-lg ">
          <Image
            alt=""
            className="p-3 h-32 lg:h-64"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col xs={24} sm={8} className="rounded-lg">
          <Image
            alt=""
            className="p-3 h-32 lg:h-64"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col xs={24} sm={8} className="rounded-lg">
          <Image
            alt=""
            className="p-3 h-32 lg:h-64"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Image.PreviewGroup>
    </Row>
  );
};

export default HotNews;
