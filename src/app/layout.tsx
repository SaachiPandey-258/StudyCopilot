import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube StudyCopilot | Grounded Lecture Intelligence Engine",
  description: "Product teardown, 1-page spec, and working prototype using Google Gemini 1.5 API to solve lecture comprehension and revision for academic and technical learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-yt-darkBg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
