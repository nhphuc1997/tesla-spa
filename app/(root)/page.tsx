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
  const { data } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => await doGet("/banners"),
  });

  console.log(data);

  return (
    <>
      <Slicker
        desktopSlidesToScroll={2}
        desktopSlidesToShow={2}
        alowMaxHeight={true}
        autoPlay={true}
        data={data?.data}
      />
      <Discovery />
      <KindOfCar />
      <TextIntro />
      <ProductsCard itemPerRow={4} />
      <HotNews />
      <ExpBuyCar />
    </>
  );
};

export default HomePage;
