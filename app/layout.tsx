import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Poppins } from "next/font/google";
import Footer from "./components/Footer";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Soheyl Ashena",
  description:
    "Welcome to my food recipe website. Here you can find a lot of recipes for different types of food.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen flex flex-col">
        <Suspense
          fallback={
            <div className="h-16 bg-gradient-to-r from-orange-500 to-red-500"></div>
          }
        >
          <Navbar />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
