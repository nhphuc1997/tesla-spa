'use client'
import { InfoCircleOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Typography } from "antd";
import { useState } from "react";

const TextIntro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Row className="w-full py-3 border-b-[1px]">
      <Col span={24} className="flex justify-start items-center">
        <Typography.Title level={5} className="!mb-0">XE ĐẠT CHUẨN 5 TỐT</Typography.Title>
        <InfoCircleOutlined className="mx-3" onClick={() => setIsModalOpen(!isModalOpen)} />
      </Col>
      <Col span={24} className="flex items-start justify-start flex-col md:justify-center md:flex-row md:items-center">
        {
          ['Pháp lý an toàn', 'Không cháy nổ', 'Không tai nạn', 'Không ngập nước', 'Kiểm tra 207 điểm'].map(item => (
            <div className="px-3">
              <SafetyCertificateOutlined className="px-1" />
              <Typography.Text>{item}</Typography.Text>
            </div>
          ))
        }
      </Col>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
        <div className="px-3">
          <Typography.Paragraph type='secondary'>
            An tâm chọn xe có Chứng nhận xe 5 Tốt - chứng nhận kiểm tra toàn diện ô tô đã qua sử dụng,
            được cấp bởi đội ngũ chuyên gia Chợ Tốt Xe.
          </Typography.Paragraph>
          <Typography.Paragraph type='secondary'>
            Đảm bảo 5 tiêu chí: Hồ sơ an toàn, không tai nạn, không ngập nước/ thuỷ kích,
            không cháy nổ và kiểm tra toàn diện 207 hạng mục
          </Typography.Paragraph>
          <Typography.Paragraph type='secondary'>
            Đạt tất cả tiêu chí của Chứng nhận Xe 5 Tốt kèm với chuẩn Odo.
            Chuẩn Odo thể hiện mức độ hợp lý của chỉ số Odo tại thời điểm kiểm tra xe
          </Typography.Paragraph>
        </div>
      </Modal>
    </Row >
  )
}

export default TextIntro;
