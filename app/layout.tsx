import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";
import { Divider, FloatButton, Layout } from "antd";
import NavHeader from "@/components/NavHeader";
import { Footer, Content } from "antd/es/layout/layout";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuperCar",
  description: "SuperCar",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

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
