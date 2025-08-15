import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistMono = JetBrains_Mono({
  subsets: ["latin"],
  weights: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Huy Hoang - AI Engineer",
  icons:
  {
    icon: 'web.ico',
  }
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={geistMono.variable}>
        <Header className="fixed top-0 left-0 w-full z-50 bg-primary" />
        <main className="pt-24 xl:pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
