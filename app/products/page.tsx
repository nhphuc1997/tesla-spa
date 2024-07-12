"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import { doGet } from "@/utils/doMethod";
import { DeleteFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Input, Radio, Row, Select, Spin, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ListPage = () => {
  const parms = useSearchParams();
  const searchCategory: any = parms.get("category");

  const [searchTearm, setSearchTearm] = useState("");
  const [category, setCategory] = useState("");
  const [carType, setCarType] = useState("");
  const [colorGroupFilter, setColorGroupFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const colorGroup = useQuery({
    queryKey: ["color-group"],
    queryFn: async () => await doGet("/color-groups"),
  });

  const categories = useQuery({
    queryKey: [""],
    queryFn: async () => await doGet("/categories"),
  });

  const products = useQuery({
    queryKey: [
      "products",
      { searchTearm, category, colorGroupFilter, maxPrice, minPrice, carType },
    ],
    queryFn: async () => {
      setLoading(true);
      if (
        searchTearm === "" &&
        category === "" &&
        carType === "" &&
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
      if (carType !== "") {
        filter = `s={ "kind": "${carType}"}`;
      }

      const result = await doGet(`/products?${filter}`);
      setLoading(false);
      return result;
    },
  });

  return (
    <Spin spinning={loading}>
      <div className="py-1">
        <Row gutter={16} className="py-3">
          <Col xs={12} md={5}>
            <div className="">
              <Input
                placeholder="car's name"
                onChange={(e) => setSearchTearm(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="">
              <Select
                style={{ width: "100%" }}
                placeholder="car's type"
                onChange={(type) => setCarType(type)}
                options={[
                  { label: "OLD CAR", value: "OLD" },
                  { label: "NEW CAR", value: "NEW" },
                ]}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="">
              <Select
                style={{ width: "100%" }}
                placeholder="car's automaker"
                onChange={(category) => setCategory(category)}
                options={categories?.data?.data?.map((item: any) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="">
              <Select
                style={{ width: "100%" }}
                placeholder="Colors"
                onChange={(type) => setCarType(type)}
                options={colorGroup?.data?.data.map((item: any) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </div>
          </Col>

          <Col xs={24} md={3}>
            <Button icon={<DeleteFilled />} />
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
