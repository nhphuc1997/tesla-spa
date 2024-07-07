"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import Discovery from "@/components/Discovery";
import TextIntro from "@/components/TextIntro";
import HotNews from "@/components/HotNews";
import ExpBuyCar from "@/components/cars/ExpBuyCar";
import KindOfCar from "@/components/cars/KindOfCar";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";

const HomePage = () => {
  const banner = useQuery({
    queryKey: ["banner"],
    queryFn: async () => await doGet("/banners"),
  });

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await doGet("/products", { limit: 12, page: 1, sort: "id,DESC" }),
  });

  return (
    <>
      <Slicker
        desktopSlidesToScroll={2}
        desktopSlidesToShow={2}
        alowMaxHeight={true}
        autoPlay={false}
        data={banner?.data?.data}
      />
      <Discovery />
      <KindOfCar />
      <TextIntro />
      <ProductsCard itemPerRow={4} data={products?.data?.data} />
      {/* <HotNews /> */}
      {/* <ExpBuyCar /> */}
    </>
  );
};

export default HomePage;