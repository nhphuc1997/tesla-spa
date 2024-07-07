"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import { doGet } from "@/utils/doMethod";
import { useQuery } from "@tanstack/react-query";
import {
  Affix,
  Breadcrumb,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Slider,
  Space,
  Typography,
} from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListPage = () => {
  const [value, setValue] = useState(1);
  const [searchTearm, setSearchTearm] = useState("");

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => doGet("/categories"),
  });

  const colorGroup = useQuery({
    queryKey: ["color-group"],
    queryFn: async () => doGet("/color-groups"),
  });

  const products = useQuery({
    queryKey: ["products", searchTearm],
    queryFn: async () =>
      doGet(`/products?s={"name": {"$starts": "${searchTearm}"}}`),
  });

  const onChangePickColor = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onChangeSelectYear: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const onChangePrice = (value: number | number[]) => {
    console.log("onChange: ", value);
  };

  const onChangePriceComplete = (value: number | number[]) => {
    console.log("onChangeComplete: ", value);
  };

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
                <Input
                  placeholder="Tìm kiếm tên xe"
                  onChange={(e) => setSearchTearm(e.target.value)}
                />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Hãng xe</Typography.Title>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn hãng xe"
                  onChange={handleChangePickBranchCar}
                  options={data?.data.map((item: any) => ({
                    label: item.name,
                    value: item.value,
                  }))}
                />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Năm sản xuất</Typography.Title>
                <DatePicker
                  className="w-full"
                  onChange={onChangeSelectYear}
                  picker="year"
                />
              </div>

              <div className="py-3">
                <Typography.Title level={5}>Màu sắc</Typography.Title>
                <Radio.Group onChange={onChangePickColor} value={value}>
                  {colorGroup?.data?.data.map((item: any) => (
                    <Radio className="!p-1" value={item?.id}>
                      {item?.name}
                    </Radio>
                  ))}
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
            <ProductsCard
              itemPerRow={6}
              isShowLoadMore={false}
              data={products?.data}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListPage;
