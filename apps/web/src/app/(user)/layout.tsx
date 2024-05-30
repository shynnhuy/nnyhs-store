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
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
}
