import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import "./globals.css";

const newsreader = Bricolage_Grotesque({
  variable: "--font-serif",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventory.webnd.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WebnD Inventory — Search-First Web Development Reference",
    template: "%s | WebnD Inventory",
  },
  description:
    "A search-first, concept-based web development learning platform. Focused, self-contained concepts across HTML, CSS, JavaScript, and more.",
  applicationName: "WebnD Inventory",
  keywords: [
    "WebnD",
    "WebnD Inventory",
    "web development",
    "HTML reference",
    "CSS reference",
    "JavaScript concepts",
    "frontend documentation",
    "developer cheat sheet",
    "flexbox",
    "CSS grid",
    "Tailwind CSS",
    "React",
    "DOM manipulation",
    "async javascript",
    "web standards",
  ],
  authors: [
    { name: "Lakshya Bansal" },
    { name: "Web & Design Society", url: "https://github.com/InventoryWebnD" },
  ],
  creator: "Web & Design Society",
  publisher: "Web & Design Society",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WebnD Inventory — Search-First Web Development Reference",
    description:
      "A search-first, concept-based web development learning platform. Focused, self-contained concepts across HTML, CSS, JavaScript, and more.",
    url: siteUrl,
    siteName: "WebnD Inventory",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icons/logo.png",
        width: 1200,
        height: 1200,
        alt: "WebnD Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "WebnD Inventory — Search-First Web Development Reference",
    description:
      "A search-first, concept-based web development learning platform.",
    images: ["/icons/logo.png"],
    creator: "@webnd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icons/logo.png",
    apple: "/apple-icon.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "WebnD Inventory",
        description:
          "A search-first, concept-based web development learning platform.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/learn?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Web & Design Society",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icons/logo.png`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${newsreader.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem("webnd_theme");
                if (saved === "light") {
                  document.documentElement.classList.remove("dark");
                } else {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
