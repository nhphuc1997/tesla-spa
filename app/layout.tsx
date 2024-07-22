import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
import Wrapper from "@/components/Wrapper";
import "/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex SuperCar",
  description: "Alex SuperCar",
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
          <Wrapper>{children}</Wrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
