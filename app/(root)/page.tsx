'use client'
import { Content, Footer } from "antd/es/layout/layout";
import { Divider, Layout } from "antd";
import KindOfCar from "@/components/KindOfCar";
import NavHeader from "@/components/NavHeader";
import ProductsCard from "@/components/ProductsCard";
import Slicker from "@/components/Slicker";
import Discovery from "@/components/Discovery";
import TextIntro from "@/components/TextIntro";
import HotNews from "@/components/HotNews";
import ExpBuyCar from "@/components/ExpBuyCar";

export default function Home() {
  return (
    <Layout className="w-full h-full">
      <NavHeader />
      <Content className="px-3">
        <Slicker desktopSlidesToScroll={1} desktopSlidesToShow={1} alowMaxHeight={true} autoPlay={true} />
        <Discovery />
        <KindOfCar />
        <TextIntro />
        <ProductsCard />
        <HotNews />
        <ExpBuyCar />

        <Divider className="!m-0" />
        <Footer className="xs:text-left lg:text-center p-3">
          SuperCar ©{new Date().getFullYear()}
        </Footer>
      </Content>
    </Layout>
  );
}
