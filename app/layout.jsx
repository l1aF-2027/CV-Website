import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const sora = Sora({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: "--font-jetbrainsMono",
});

const siteUrl = "https://l1af.vercel.app"; // update when deployed

export const metadata = {
  // ── Core ───────────────────────────────────────────────
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ha Huy Hoang",
    template: "%s | Ha Huy Hoang",
  },
  description:
    "Ha Huy Hoang – AI Engineer specializing in ML model optimization, Edge AI, and Data Science. Graduated from VNU-HCM UIT with GPA 9.1/4.0, currently working as an AI Engineer at FPT Software.",
  keywords: [
    "Hà Huy Hoàng",
    "Ha Huy Hoang",
    "Huy Hoang AI Engineer",
    "AI Engineer Vietnam",
    "Machine Learning Engineer Vietnam",
    "Edge AI Engineer",
    "Data Scientist Vietnam",
    "FPT Software AI",
    "VNU HCM UIT AI",
    "Deep Learning Vietnam",
    "PyTorch TensorFlow Vietnam",
    "Python AI Engineer",
    "portfolio AI engineer",
    "l1aF-2027",
  ],
  authors: [{ name: "Ha Huy Hoang", url: siteUrl }],
  creator: "Ha Huy Hoang",
  publisher: "Ha Huy Hoang",

  // ── Open Graph (Facebook, LinkedIn, Zalo…) ────────────
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ha Huy Hoang",
    title: "Ha Huy Hoang",
    description:
      "AI Engineer specializing in ML model optimization, Edge AI deployment, and Data Science. 2nd Place UIT Data Science Challenge 2024.",
    locale: "vi_VN",
    alternateLocale: "en_US",
    images: [
      {
        url: "/assets/og-image.png", // add a 1200×630 image here later
        width: 1200,
        height: 630,
        alt: "Ha Huy Hoang",
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Ha Huy Hoang",
    description:
      "AI Engineer specializing in ML model optimization and Edge AI deployment. Portfolio of Ha Huy Hoang.",
    images: ["/assets/og-image.png"],
  },

  // ── Canonical & robots ─────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // ── Verification ──────────────────────────────────────────────
  verification: {
    google: "tsq-VDYRvE2CWe_8KcHeNw9Jp0zpOOP9cgp_r998POM",
  },
};

// JSON-LD – Structured data for Google rich results (Person schema)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hà Huy Hoàng",
  alternateName: ["Ha Huy Hoang", "Huy Hoang"],
  url: siteUrl,
  image: `${siteUrl}/assets/photo1.png`,
  jobTitle: "AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "FPT Software",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "VNU-HCM University of Information Technology",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Edge AI",
    "Computer Vision",
    "Data Science",
    "PyTorch",
    "TensorFlow",
    "FastAPI",
    "Next.js",
  ],
  nationality: "Vietnamese",
  email: "ha.huy.hoang.tkl@gmail.com",
  sameAs: [
    "https://github.com/l1aF-2027",
    "https://www.linkedin.com/in/hoang-huy-6b77a12a8/",
  ],
  description:
    "Hà Huy Hoàng is an AI Engineer specializing in ML model optimization, Edge AI deployment, and Data Science. Graduate of VNU-HCM UIT with GPA 9.1/4.0, 2nd Place at UIT Data Science Challenge 2024.",
};

// JSON-LD – Structured data for Google to pick up the Site Name
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ha Huy Hoang",
  alternateName: ["Ha Huy Hoang", "Ha Huy Hoang Portfolio"],
  url: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero image for fastest LCP */}
        <link
          rel="preload"
          href="/assets/image.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <div style={{ position: "relative", zIndex: 10 }}>
          <Header className="fixed top-0 left-0 w-full z-50" />
          <main className="pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
