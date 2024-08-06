import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF Carousel generator",
  description: "Create beautiful PDF carousel for linkedin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
