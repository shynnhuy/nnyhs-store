import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/AuthPopup";
import { Header } from "./components/header";
import { inter } from "@/utils/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NnyhS Store",
  description: "NnyhS Store",
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
