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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListPage = () => {
  const parms = useSearchParams();
  const searchCategory = parms.get("category");

  const [searchTearm, setSearchTearm] = useState("");
  const [category, setCategory] = useState("");
  const [colorGroupFilter, setColorGroupFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => doGet("/categories"),
  });

  const colorGroup = useQuery({
    queryKey: ["color-group"],
    queryFn: async () => doGet("/color-groups"),
  });

  const products = useQuery({
    queryKey: [
      "products",
      { searchTearm, category, colorGroupFilter, maxPrice, minPrice },
    ],
    queryFn: async () => {
      if (
        searchCategory === "" &&
        category === "" &&
        colorGroupFilter === "" &&
        (maxPrice === 0 || minPrice === 0)
      ) {
        return doGet("/products");
      }

      let filter = "";
      if (searchCategory !== "") {
        filter = `s={ "name": { "$cont": "${searchTearm}" } }`;
      }
      if (category !== "") {
        filter = `s={ "category.name": { "$eq": "${category}" } }`;
      }
      if (colorGroupFilter !== "") {
        filter = `s={ "colorGroup.id": { "$eq": "${colorGroupFilter}" } }`;
      }
      if (maxPrice !== 0 || minPrice !== 0) {
        filter = `s={ "colorGroup.id": { "$eq": "${colorGroupFilter}" } }`;
      }

      return doGet(`/products?${filter}`);
    },
  });

  const onChangePickColor = (e: RadioChangeEvent) => {
    setColorGroupFilter(e.target.value);
  };

  const onChangeSelectYear: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const onChangePriceComplete = (value: any) => {
    setMaxPrice(value[1]);
    setMinPrice(value[0]);
  };

  const handleChangePickBranchCar = (value: string) => {
    setCategory(value);
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
                  // mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn hãng xe"
                  onChange={handleChangePickBranchCar}
                  options={data?.data.map((item: any) => ({
                    label: item.name,
                    value: item.value,
                  }))}
                />
              </div>

              {/* <div className="py-3">
                <Typography.Title level={5}>Năm sản xuất</Typography.Title>
                <DatePicker
                  className="w-full"
                  onChange={onChangeSelectYear}
                  picker="year"
                />
              </div> */}

              <div className="py-3">
                <Typography.Title level={5}>Màu sắc</Typography.Title>
                <Radio.Group
                  onChange={onChangePickColor}
                  value={colorGroupFilter}
                >
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
