import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";

export const firstFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const geistSans = Geist({
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
});
