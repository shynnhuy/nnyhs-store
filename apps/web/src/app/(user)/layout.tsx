import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/AuthPopup";
import { Header } from "./components/header";
import { inter } from "@/utils/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NnyhS Store ACP",
  description: "Private page for NnyhS Store ACP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={inter.className}>
      <Header />
      {children}
      <AuthPopup />
      <RefreshTokenJob />
    </body>
  );
}
