import { Col, Divider, Row, Typography, Tag, Tooltip } from "antd"
import mc1 from '@/assets/images/mc1.jpg'
import Image from "next/image"

const ExpBuyCar = () => {
  return (
    <Row className="w-full py-3 cursor-pointer">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="left">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            KINH NGHIỆM MUA XE
          </Typography.Title>
        </Divider>
      </Col>

      <Col span={24} className="pb-3 w-full flex justify-start items-center">
        {
          ['Hiểu về xe', 'Giá xe', 'Kinh nghiệm chọn xe', 'Tư vấn'].map(item =>
            <Tag color="gold">{item}</Tag>
          )
        }
      </Col>

      {[1, 2, 3, 4, 5, 6].map(item => (
        <Col span={6} className="hover:shadow-md rounded-lg">
          <div className="w-full flex justify-start items-start p-1 m-2">
            <div className="w-1/2">
              <Image className="rounded-lg" src={mc1} alt="" />
            </div>
            <div className="w-1/2 px-2">
              <Typography.Title level={5} className="!mb-0 truncate">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography.Title>

              <Tooltip title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries,
                but also the leap into electronic typesetting">
                <Typography.Paragraph className="truncate">
                  Lorem Ipsum has been the industry's standard
                </Typography.Paragraph>
              </Tooltip>
            </div>
          </div>
        </Col>
      ))}
    </Row >
  )
}

export default ExpBuyCar
