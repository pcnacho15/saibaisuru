export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID; // Reemplaza por tu ID real

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};