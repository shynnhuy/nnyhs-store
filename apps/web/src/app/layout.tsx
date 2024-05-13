import "@repo/ui/global.css";
import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryProvider } from "@/components/QueryProvider";
import MainLayout from "@/components/layouts/MainLayout";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgb(233, 69, 96)",
            },
          }}
        >
          <QueryProvider>
            <body className={inter.className}>
              <MainLayout>{children}</MainLayout>
            </body>
          </QueryProvider>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
