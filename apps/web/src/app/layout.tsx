import "@repo/ui/global.css";
import { QueryProvider } from "@/components/QueryProvider";
import { inter } from "@/utils/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Header } from "./layouts/header";
import { AuthPopup } from "@/components/auth/AuthPopup";
import { AuthPopupStoreProvider } from "@/provider/auth-popup-provider";

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
            <AuthPopupStoreProvider>
              <body className={inter.className}>
                <Header />
                {children}
                <AuthPopup />
              </body>
            </AuthPopupStoreProvider>
          </QueryProvider>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
