import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/common/FooterWrapper";
import Navbar from "@/components/common/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zivara",
  description: "Women's Fashion Store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar/>
          {children}
          <img
            src="/images/lips.png"
            className="-rotate-20 w-40 fixed bottom-20 opacity-20 right-5 pointer-events-none z-10"
          />
          <FooterWrapper/>
        </AuthProvider>
      </body>
    </html>
  );
}
