import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Define your metadata for SEO and social sharing here
export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: "The Daily Grind Cafe",
    template: "%s | The Daily Grind Cafe",
  },
  description:
    "A cozy cafe serving the finest coffee, fresh pastries, and delicious sandwiches. Order online for delivery or dine-in.",
  keywords: [
    "coffee shop",
    "cafe",
    "pastries",
    "sandwiches",
    "local coffee",
    "online ordering",
    "dine-in",
  ],
  authors: [{ name: "The Daily Grind Team" }],

  // Open Graph metadata for social media sharing (e.g., Facebook, LinkedIn)
  openGraph: {
    title: "The Daily Grind Cafe",
    description:
      "A cozy cafe serving the finest coffee, fresh pastries, and delicious sandwiches. Order online for delivery or dine-in.",
    url: "https://your-domain.com", // Replace with your domain
    siteName: "The Daily Grind Cafe",
    images: [
      {
        url: "https://placehold.co/1200x630/2A2F3A/FFFFFF?text=The+Daily+Grind+Cafe", // Placeholder image for your cafe logo or a compelling photo
        width: 1200,
        height: 630,
        alt: "The Daily Grind Cafe Logo and a cup of coffee",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata for Twitter
  twitter: {
    card: "summary_large_image",
    title: "The Daily Grind Cafe",
    description:
      "A cozy cafe serving the finest coffee, fresh pastries, and delicious sandwiches. Order online for delivery or dine-in.",
    creator: "@yourTwitterHandle", // Replace with your Twitter handle
    images: [
      "https://placehold.co/1200x675/2A2F3A/FFFFFF?text=The+Daily+Grind+Cafe+Twitter",
    ], // Placeholder image for Twitter
  },

  // Other metadata
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
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
