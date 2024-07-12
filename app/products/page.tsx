"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import { doGet } from "@/utils/doMethod";
import { DeleteFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Radio,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ListPage = () => {
  const parms = useSearchParams();
  const searchCategory: any = parms.get("category");

  const [searchTearm, setSearchTearm] = useState<null | string>(null);
  const [category, setCategory] = useState<null | string>(null);
  const [carType, setCarType] = useState<null | string>(null);
  const [year, setYear] = useState<number | any>(0);
  const [colorGroupFilter, setColorGroupFilter] = useState<null | string>(null);
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
      { searchTearm, category, colorGroupFilter, carType, year },
    ],
    queryFn: async () => {
      setLoading(true);
      if (
        !searchTearm &&
        !category &&
        !carType &&
        !colorGroupFilter &&
        year === 0
      ) {
        setLoading(false);
        return doGet("/products");
      }

      const $filter: any = {};
      if (searchTearm) {
        $filter["name"] = { $cont: searchTearm };
      }
      if (category) {
        $filter["category.name"] = category;
      }
      if (colorGroupFilter) {
        console.log(colorGroupFilter, "colorGroupFilter");

        $filter["colorGroup.id"] = colorGroupFilter;
      }
      if (carType) {
        $filter["kind"] = carType;
      }
      if (year !== 0) {
        $filter["manufactureYear"] = year;
      }

      const result = await doGet(`/products`, { s: JSON.stringify($filter) });
      setLoading(false);
      return result;
    },
  });

  return (
    <Spin spinning={loading}>
      <div className="py-1">
        <Row gutter={16} className="py-3">
          <Col xs={24} md={5}>
            <div className="py-1">
              <Input
                placeholder="car's name"
                onChange={(e) => setSearchTearm(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="py-1">
              <Select
                value={carType}
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
            <div className="py-1">
              <Select
                value={category}
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
            <div className="py-1">
              <Select
                value={colorGroupFilter}
                style={{ width: "100%" }}
                placeholder="colors"
                onChange={(type) => setColorGroupFilter(type)}
                options={colorGroup?.data?.data.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div className="py-1">
              <DatePicker
                value={year}
                style={{ width: "100%" }}
                onChange={(e) => setYear(e.year())}
                picker="year"
              />
            </div>
          </Col>
        </Row>

        <Row className="pb-3">
          <Col xs={24} md={2}>
            <Button
              block
              icon={<DeleteFilled />}
              onClick={() => {
                setSearchTearm(null);
                setCategory(null);
                setCarType(null);
                setYear(0);
                setColorGroupFilter(null);
              }}
            >
              Clear filter
            </Button>
          </Col>
        </Row>

        {(() => {
          if (products?.data?.data?.length) {
            return (
              <ProductsCard
                itemPerRow={8}
                isShowLoadMore={false}
                data={products?.data}
              />
            );
          }

          return <Empty className="py-36" />;
        })()}
      </div>
    </Spin>
  );
};

export default ListPage;
