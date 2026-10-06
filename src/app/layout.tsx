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
    "Software Engineer with 4+ years building production systems end to end. Backends in Python, FastAPI, and Node.js. Frontends in React and Next.js. AI systems with LangGraph multi-agent orchestration, RAG pipelines, and MCP servers.",
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
      "Software Engineer with 4+ years building production systems end to end. Backends in Python, FastAPI, and Node.js. Frontends in React and Next.js. AI systems with LangGraph multi-agent orchestration, RAG pipelines, and MCP servers.",
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
      "Software Engineer with 4+ years building production systems end to end. Backends in Python, FastAPI, and Node.js. Frontends in React and Next.js. AI systems with LangGraph multi-agent orchestration, RAG pipelines, and MCP servers.",
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
              url: "https://pssgowthamportfolio.vercel.app/",
              email: "mailto:santoshp12122@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/santoshsaigowtham/",
                "https://github.com/pssgowtham",
              ],
              knowsAbout: [
                "Python",
                "FastAPI",
                "React",
                "TypeScript",
                "LangGraph",
                "LangChain",
                "RAG",
                "MCP",
                "Pinecone",
                "LLM Evaluation",
                "Microservices",
                "PostgreSQL",
                "AWS",
                "Azure",
                "Docker",
                "Kubernetes",
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
