"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import { doGet } from "@/utils/doMethod";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  DatePickerProps,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListPage = () => {
  const parms = useSearchParams();
  const searchCategory: any = parms.get("category");

  const [searchTearm, setSearchTearm] = useState("");
  const [category, setCategory] = useState("");
  const [colorGroupFilter, setColorGroupFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(true);
      if (
        searchTearm === "" &&
        category === "" &&
        colorGroupFilter === "" &&
        (maxPrice === 0 || minPrice === 0)
      ) {
        return doGet("/products");
      }

      let filter = "";
      if (searchTearm !== "") {
        filter = `s={ "name": { "$cont": "${searchTearm}" } }`;
      }
      if (category !== "") {
        filter = `s={ "category.name": { "$eq": "${category}" } }`;
      }
      if (colorGroupFilter !== "") {
        filter = `s={ "colorGroup.id": { "$eq": "${colorGroupFilter}" } }`;
      }
      if (maxPrice !== 0 || minPrice !== 0) {
        filter = `s={"$and": [{ "price": { "$gte": "${minPrice}" }}, { "price": { "$lte": "${maxPrice}" }}]}`;
      }

      const result = await doGet(`/products?${filter}`);
      setLoading(false);
      return result;
    },
  });

  const banner = useQuery({
    queryKey: ["banner"],
    queryFn: async () => await doGet("/banners"),
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

  useEffect(() => {
    if (searchCategory && searchCategory !== "") {
      setCategory(searchCategory);
    }
  }, [searchCategory]);

  return (
    <Spin spinning={false}>
      <div className="min-h-full">
        <Row gutter={16} className="pt-3">
          <Col xs={24} md={24} className="">
            <div className="p-3 bg-white w-full">
              <Row gutter={16}>
                <Col xs={12} md={3}>
                  <div className="">
                    <Typography.Title level={5}>Tìm kiếm</Typography.Title>
                    <Input
                      placeholder="Tìm kiếm tên xe"
                      onChange={(e) => setSearchTearm(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xs={12} md={3}>
                  <div className="">
                    <Typography.Title level={5}>Loại xe</Typography.Title>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Chọn loại xe"
                      onChange={handleChangePickBranchCar}
                      options={[
                        { label: "Xe cũ", value: "OLD" },
                        { label: "Xe mới", value: "NEW" },
                      ]}
                    />
                  </div>
                </Col>

                <Col xs={12} md={3}>
                  <div className="">
                    <Typography.Title level={5}>Hãng xe</Typography.Title>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Chọn hãng xe"
                      onChange={handleChangePickBranchCar}
                      options={data?.data.map((item: any) => ({
                        label: item.name,
                        value: item.value,
                      }))}
                    />
                  </div>
                </Col>

                <Col xs={12} md={8}>
                  <div className="">
                    <Typography.Title level={5}>Màu sắc</Typography.Title>
                    <Radio.Group
                      onChange={onChangePickColor}
                      value={colorGroupFilter}
                    >
                      {colorGroup?.data?.data.map((item: any) => (
                        <Radio key={item.id} className="!p-1" value={item?.id}>
                          {item?.name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <ProductsCard
          itemPerRow={8}
          isShowLoadMore={false}
          data={products?.data}
        />
      </div>
    </Spin>
  );
};

export default ListPage;
