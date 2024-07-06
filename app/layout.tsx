import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";
import { Divider, FloatButton, Layout } from "antd";
import { Footer, Content } from "antd/es/layout/layout";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
import NavHeader from "@/components/headers/NavHeader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wrapper from "@/components/Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuperCar",
  description: "SuperCar",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{ elements: { footer: "hidden" } }}
      localization={viVN}
    >
      <html lang="en">
        <body className={inter.className}>
          <Wrapper children={children} />
        </body>
      </html>
    </ClerkProvider>
  );
}
