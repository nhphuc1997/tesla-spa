"use client";
import KindOfCar from "@/components/KindOfCar";
import ProductsCard from "@/components/ProductsCard";
import Slicker from "@/components/Slicker";
import Discovery from "@/components/Discovery";
import TextIntro from "@/components/TextIntro";
import HotNews from "@/components/HotNews";
import ExpBuyCar from "@/components/ExpBuyCar";

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
