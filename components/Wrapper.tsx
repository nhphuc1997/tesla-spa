"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Divider, Layout } from "antd";
import NavHeader from "./headers/NavHeader";
import { Footer, Content } from "antd/es/layout/layout";

const queryClient = new QueryClient();

export default function Wrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <Layout className="w-full min-h-dvh !bg-white">
          <NavHeader />

          <Content className="mx-3 border-l border-r">
            {children}
            <Divider className="!m-0" />
          </Content>

          <Footer className="xs:text-left lg:text-center !bg-white">
            SuperCar ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
