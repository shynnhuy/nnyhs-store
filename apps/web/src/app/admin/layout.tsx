import Link from "next/link";
import Sidebar from "./side-bar";
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
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[80px] items-center justify-center border-b px-5">
                <Link
                  className="flex justify-center items-center gap-2 font-bold text-2xl text-primary text-center"
                  href="/"
                >
                  <span className="">NnyhS Store</span>
                </Link>
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="overflow-hidden p-4 md:p-6 rounded-[0.5rem]">
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
