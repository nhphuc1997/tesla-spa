import { Col, Divider, Flex, Row, Tag, Typography } from "antd";

const HotKeywords = () => {
  return (
    <Row className="py-3">
      <Col span={24} className=" flex items-center w-full justify-center pb-3">
        <Divider orientation="left">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            CÁC TỪ KHOÁ PHỔ BIẾN
          </Typography.Title>
        </Divider>
      </Col>

      {/* {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 7].map(item => (
        <Col xs={8} md={6} key={item} className="px-3">
          <ul>
            <li className="py-1"><Tag color="magenta">magenta</Tag></li>
            <li className="py-1"><Tag color="magenta">magenta</Tag></li>
            <li className="py-1"><Tag color="magenta">magenta</Tag></li>
          </ul>
        </Col>
      ))} */}

    </Row>
  )
}

export default HotKeywords;
