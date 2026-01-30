// ==============================
// Next.js Metadata & Font Setup
// ==============================

import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

// ==============================
// Shared Layout Components
// ==============================

import NavigationBar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ==============================
// Google Font Configuration
// ==============================
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

// ==============================
// SEO & Metadata (App Router)
// ==============================

export const metadata: Metadata = {
  title: "Chairul Ikhsan | Portofolio",
  description: "A modern minimalist portfolio",
  verification: {
    google: "3fbfe14d56090628",
  },
};

// ==============================
// Root Layout Component
// ==============================

/*Layout utama yang membungkus seluruh halaman*/
/*Navbar dan Footer akan selalu tampil*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body
        className={`
          ${sora.variable}
          font-sans
          min-h-screen
          overflow-x-hidden
        `}
      >
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Spacer untuk menghindari konten tertutup navbar (fixed) */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
