import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import CrispChat from "./components/CrispChat";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Restore STL | Sell Your House Fast in St. Louis",
  description:
    "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle. Restore STL buys houses in any condition — close on your timeline.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Restore STL | Sell Your House Fast in St. Louis",
    description:
      "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle.",
    url: "https://restorestl.com",
    siteName: "Restore STL",
    images: [
      {
        url: "https://restorestl.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restore STL | Sell Your House Fast in St. Louis",
    description:
      "Get a cash offer on your St. Louis home. No repairs, no fees, no hassle.",
    images: ["https://restorestl.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        {children}
        <CrispChat />
      </body>
    </html>
  );
}
