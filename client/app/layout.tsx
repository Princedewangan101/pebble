import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/mycompo/Navbar";
import Footer from "@/components/mycompo/Footer";
import NavbarSwitcher from "@/components/mycompo/NavbarSwitcher";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Build.web",
  description: "AI builder thats build web apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${poppins.variable} dark relative custom-scrollbar antialiased`}>
          <NavbarSwitcher />
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
