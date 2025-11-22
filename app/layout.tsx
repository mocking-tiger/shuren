import type { Metadata } from "next";
import { Geist, Geist_Mono, Gowun_Batang, Shippori_Mincho, Yuji_Syuku } from "next/font/google";
import "./globals.css";
import SizeChecker from "./components/ui/SizeChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 한글용 - 메인 콘텐츠
const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  variable: "--font-gowun-batang",
  subsets: ["latin"],
});

// 일본어용 - 메인 콘텐츠
const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
});

// 제목/로고용 - 강한 붓글씨 (일본어 한자 지원)
const yujiSyuku = Yuji_Syuku({
  weight: "400",
  variable: "--font-yuji-syuku",
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
        className={`${geistSans.variable} ${geistMono.variable} ${gowunBatang.variable} ${shipporiMincho.variable} ${yujiSyuku.variable} antialiased`}
      >
        <div className="min-h-screen bg-[url('/images/bg/shoji2.jpg')] bg-cover bg-center flex items-center justify-center">
          {/* 컨텐츠 블럭 */}
          <main className="w-[90%] md:w-[70%] h-screen bg-[url('/images/bg/hanji2.jpg')]">
            {children}
          </main>
          <SizeChecker />
        </div>
      </body>
    </html>
  );
}
