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

export default function Home() {
  return (
    <Layout className="w-full h-full">
      <NavHeader />
      <Content className="px-3">
        <Slicker desktopSlidesToScroll={1} desktopSlidesToShow={1} alowMaxHeight={true} />
        <Discovery />
        <KindOfCar />
        <TextIntro />
        <ProductsCard />
        <HotNews />

        <Divider className="!m-0" />
        <Footer className="xs:text-left lg:text-center p-3">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Content>
    </Layout>
  );
}
