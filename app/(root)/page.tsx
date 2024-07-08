"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import TextIntro from "@/components/TextIntro";
import KindOfCar from "@/components/cars/KindOfCar";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";
import { useState } from "react";
import { Spin } from "antd";

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
      return await doGet("/products", { limit: 12, page: 1, sort: "id,DESC" });
    },
  });

  return (
    <Spin spinning={loading}>
      <Slicker
        desktopSlidesToScroll={1}
        desktopSlidesToShow={3}
        alowMaxHeight={true}
        autoPlay={true}
        data={banner?.data?.data}
      />
      <TextIntro />
      <ProductsCard itemPerRow={6} data={products?.data?.data} />
    </Spin>
  );
};

export default HomePage;
