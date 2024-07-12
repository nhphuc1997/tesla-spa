"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import TextIntro from "@/components/TextIntro";
import { doGet } from "@/utils/doMethod";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  DatePickerProps,
  Drawer,
  Input,
  Menu,
  MenuProps,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const ListPage = () => {
  const parms = useSearchParams();
  const searchCategory: any = parms.get("category");

  const [searchTearm, setSearchTearm] = useState("");
  const [category, setCategory] = useState("");
  const [colorGroupFilter, setColorGroupFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await doGet("/categories");
      if (response.statusCode === 200) {
        const items: MenuItem[] = response.data.map((item: any) => ({
          label: (
            <Link
              href={`/products?category=${item.name}`}
              className="capitalize"
            >
              {item.name}
            </Link>
          ),
          key: item.value,
        }));

        return items;
      }
      return [];
    },
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
        setLoading(false);
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
      return result;
    },
  });

  return (
    <Spin spinning={loading}>
      <Menu
        className="min-h-[45px] !w-full flex justify-center items-center !border-b-0"
        mode="horizontal"
        items={categories?.data}
      />

      <div className="py-1">
        <Row gutter={16} className="py-3 px-4">
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
                onChange={(e) => console.log(e)}
                options={[
                  { label: "OLD CAR", value: "OLD" },
                  { label: "NEW CAR", value: "NEW" },
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
                onChange={(e) => console.log(e)}
                options={categories?.data?.map((item: any) => ({
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
                onChange={(e) => console.log(e)}
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
