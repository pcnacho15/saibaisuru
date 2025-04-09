import type { Metadata } from "next";
import "./globals.css";
import { firstFont } from "@/config/fonts";
import { Provider } from "@/provider/Provider";
import { ToastContainer } from "react-toastify";
import AgeGateModal from "@/components/auth/age-gate-modal";

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
      <body className={`${firstFont.className} bg-gray-100`}>
        <AgeGateModal />
        <Provider>
          {children}
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
