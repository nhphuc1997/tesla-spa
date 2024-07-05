import { Col, Divider, Row, Typography, Tag, Tooltip } from "antd"
import mc1 from '@/assets/images/mc1.jpg'
import Image from "next/image"
import { CalendarOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const ExpBuyCar = () => {
  const router = useRouter()

  return (
    <Row gutter={16} className="w-full py-3 cursor-pointer">
      <Col span={24} className="flex items-center w-full justify-center pb-3">
        <Divider orientation="left">
          <Typography.Title level={5} className="!mb-0 text-center md:text-left">
            KINH NGHIỆM MUA XE
          </Typography.Title>
        </Divider>
      </Col>

      <Col span={24} className="px-3 w-full flex justify-start items-center">
        {
          ['Hiểu về xe', 'Giá xe', 'Kinh nghiệm chọn xe', 'Tư vấn'].map(item =>
            <Tag color="gold" key={item}>{item}</Tag>
          )
        }
      </Col>

      {[1, 2, 3, 4, 5, 6].map(item => (
        <Col key={item} span={6} className="hover:bg-white hover:shadow-md rounded-lg" onClick={() => router.push('/articles/1')}>
          <div className="w-full flex justify-start items-start !p-3">
            <div className="w-1/2">
              <Image className="rounded-lg" src={mc1} alt="" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Typography.Title level={5} className="!mb-0 truncate">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography.Title>

              <Tooltip title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries,
                but also the leap into electronic typesetting">
                <Typography.Paragraph className="!mb-0 truncate">
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries,
                  but also the leap into electronic typesetting
                </Typography.Paragraph>
              </Tooltip>

              <Typography.Text className="truncate">
                <CalendarOutlined /> 20/12/2024
              </Typography.Text>
            </div>
          </div>
        </Col>
      ))}
    </Row >
  )
}

export default ExpBuyCar
