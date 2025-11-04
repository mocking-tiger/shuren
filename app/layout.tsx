import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shuren - 修錬",
  description: "일본어 단어 학습 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[url('/images/bg/shoji2.jpg')] bg-cover bg-center flex items-center justify-center">
          {/* 컨텐츠 블럭 */}
          <main className="w-[70%] h-screen bg-[url('/images/bg/hanji2.jpg')]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
