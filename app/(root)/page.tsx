"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import TextIntro from "@/components/TextIntro";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";
import { useState } from "react";
import { Flex, Menu, MenuProps, Spin } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const banner = useQuery({
    queryKey: ["banner"],
    queryFn: async () => await doGet("/banners"),
  });

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoading(false);
      return await doGet("/products", { limit: 12, page: 1, sort: "id,ASC" });
    },
  });

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

  return (
    <Spin spinning={loading}>
      <Menu
        className="!w-full flex justify-center items-center !border-b-0"
        mode="horizontal"
        items={categories?.data}
      />
      <Slicker
        desktopSlidesToScroll={1}
        desktopSlidesToShow={1}
        alowMaxHeight={true}
        autoPlay={false}
        data={banner?.data?.data}
        centerMode={false}
      />
      <ProductsCard itemPerRow={8} data={products?.data?.data} />
    </Spin>
  );
};

export default HomePage;
