import type { Metadata } from "next";
import "./globals.css";
import { firstFont } from "@/config/fonts";
import { Provider } from "@/provider/Provider";
import { ToastContainer } from "react-toastify";
import AgeGateModal from "@/components/auth/age-gate-modal";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SaibaiSuru",
  description: "Un espacio creado por cultivadores, para cultivadores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9RBFY4W0HS"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9RBFY4W0HS');
            `,
        }}
      />
      <body className={`${firstFont.className} bg-gray-100`}>
        <AgeGateModal />
        <Provider>{children}</Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
