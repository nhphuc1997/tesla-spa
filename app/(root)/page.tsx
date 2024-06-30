'use client'
import NavHeader from "@/components/NavHeader";
import ProductsCard from "@/components/ProductsCard";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Home() {
  return (
    <Layout className="w-full h-full">
      <NavHeader />
      <Content className="px-3 h-full">
        <ProductsCard />
      </Content>
    </Layout>
  );
}
