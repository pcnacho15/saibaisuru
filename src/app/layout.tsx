import type { Metadata } from "next";
import "./globals.css";
import { firstFont } from "@/config/fonts";
import { Provider } from "@/provider/Provider";

export const metadata: Metadata = {
  title: "Saibai Suru",
  description: "Cultiva tu esencia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firstFont.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
