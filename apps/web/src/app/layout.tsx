import "@repo/ui/global.css";
import type { Metadata } from "next";
import { QueryProvider } from "@/components/QueryProvider";
import StyledComponentsRegistry from "@/lib/registry";
import AppProvider from "@/provider/AppProvider";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { inter } from "@/utils/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "NnyhS Store - Home page",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authentication")?.value;
  const refreshToken = cookieStore.get("Refresh")?.value;

  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "rgb(233, 69, 96)",
                },
              }}
            >
              <QueryProvider>
                <AppProvider
                  initialTokens={
                    accessToken && refreshToken
                      ? {
                          accessToken,
                          refreshToken,
                        }
                      : undefined
                  }
                >
                  <StyledComponentsRegistry>
                    {children}
                  </StyledComponentsRegistry>
                </AppProvider>
              </QueryProvider>
            </ConfigProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
