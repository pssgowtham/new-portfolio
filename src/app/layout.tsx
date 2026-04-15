import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SkipToContent from "@/components/layout/SkipToContent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santosh Sai Gowtham Pasala | AI Software Engineer",
  description:
    "AI Software Engineer with 4+ years of experience building scalable web applications and AI-powered systems. Specializing in Python, Node.js, React.js, and AWS with hands-on expertise in LLM integration, RAG pipelines, and production-grade monitoring.",
  keywords: [
    "AI Software Engineer",
    "Full Stack Developer",
    "React",
    "Python",
    "Next.js",
    "LangChain",
    "LangGraph",
    "AWS",
    "Machine Learning",
  ],
  authors: [{ name: "Santosh Sai Gowtham Pasala" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Santosh Sai Gowtham Pasala | AI Software Engineer",
    description:
      "AI Software Engineer with 4+ years of experience building scalable web applications and AI-powered systems.",
    siteName: "Santosh Pasala Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Santosh Sai Gowtham Pasala - AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santosh Sai Gowtham Pasala | AI Software Engineer",
    description:
      "AI Software Engineer with 4+ years of experience building scalable web applications and AI-powered systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Santosh Sai Gowtham Pasala",
              jobTitle: "AI Software Engineer",
              url: "https://santoshpasala.dev",
              sameAs: [
                "https://www.linkedin.com/in/santoshsaigowtham/",
                "https://github.com/pssgowtham",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Jose",
                addressRegion: "CA",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <SkipToContent />
          <ScrollProgress />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
