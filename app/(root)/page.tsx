"use client";
import ProductsCard from "@/components/cars/ProductsCard";
import Slicker from "@/components/Slicker";
import Discovery from "@/components/Discovery";
import TextIntro from "@/components/TextIntro";
import HotNews from "@/components/HotNews";
import ExpBuyCar from "@/components/cars/ExpBuyCar";
import KindOfCar from "@/components/cars/KindOfCar";

export default function Home() {
  return (
    <>
      <Slicker
        desktopSlidesToScroll={1}
        desktopSlidesToShow={1}
        alowMaxHeight={true}
      />
      <Discovery />
      <KindOfCar />
      <TextIntro />
      <ProductsCard />
      <HotNews />
      <ExpBuyCar />
    </>
  );
}
