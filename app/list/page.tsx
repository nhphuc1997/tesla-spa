'use client'
import ProductsCard from "@/components/cars/ProductsCard";
import {
  Affix, Breadcrumb, Col, DatePicker, DatePickerProps,
  Input, Radio, RadioChangeEvent, Row, Select, Slider, Space,
  Typography
} from "antd"
import Link from "next/link"
import { useState } from "react";

const ListPage = () => {
  const [value, setValue] = useState(1);

  const onChangePickColor = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onChangeSelectYear: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangePrice = (value: number | number[]) => {
    console.log('onChange: ', value);
  };

  const onChangePriceComplete = (value: number | number[]) => {
    console.log('onChangeComplete: ', value);
  };

  const options = [
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea',
    }
  ];

  const handleChangePickBranchCar = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="py-3 min-h-full">
      <Breadcrumb
        items={[
          { title: <Link href="/">Trang chủ</Link> },
          { title: "Danh sách" },
        ]}
      />

      <Row gutter={16} className="pt-3">
        <Col xs={24} md={6} className="hidden md:block">
          <Affix offsetTop={60} className="">
            <div className="p-6 bg-white rounded-lg h-auto mt-3">
              <div className="py-3">
                <Typography.Title level={5}>Tìm kiếm</Typography.Title>
                <Input placeholder="Tìm kiếm tên xe" />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Hãng xe</Typography.Title>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Chọn hãng xe"
                  defaultValue={['japan']}
                  onChange={handleChangePickBranchCar}
                  options={options}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                      </span>
                      {option.data.desc}
                    </Space>
                  )}
                />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Năm sản xuất</Typography.Title>
                <DatePicker className="w-full" onChange={onChangeSelectYear} picker="year" />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Màu sắc</Typography.Title>
                <Radio.Group onChange={onChangePickColor} value={value}>
                  <Radio value={1}>Đen</Radio>
                  <Radio value={2}>Vàng</Radio>
                  <Radio value={3}>Trắng</Radio>
                  <Radio value={4}>Đỏ</Radio>
                  <Radio value={5}>Khác</Radio>
                </Radio.Group>
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Khoảng giá</Typography.Title>
                <Slider
                  range
                  step={10}
                  defaultValue={[20, 50]}
                  onChange={onChangePrice}
                  onChangeComplete={onChangePriceComplete}
                />
              </div>
            </div>
          </Affix>
        </Col>

        <Col xs={24} md={18}>
          <div className="bg-white rounded-lg h-auto md:min-h-dvh mt-3">
            <ProductsCard isShowLoadMore={false} />
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default ListPage
