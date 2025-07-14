import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Paraclet",
  description: "AI-native solutions for architects and designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
