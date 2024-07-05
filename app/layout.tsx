import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";
import { Divider, Layout } from "antd";
import NavHeader from "@/components/NavHeader";
import { Footer, Content } from "antd/es/layout/layout";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuperCar",
  description: "SuperCar",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ elements: { footer: "hidden" } }} localization={viVN}>
      <html lang="en">
        <body className={inter.className}>
          <Layout className="w-full h-full">
            <NavHeader />
            <Content className="mx-3">
              {children}
              <Divider className="!m-0" />
              <Footer className="xs:text-left lg:text-center p-3 bg-white">
                SuperCar ©{new Date().getFullYear()}
              </Footer>
            </Content>
          </Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}
