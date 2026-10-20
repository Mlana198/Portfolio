import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irfan Afandi | IT & IoT Portfolio",
  description: "Portofolio profesional Irfan Afandi - Spesialis Teknologi Informasi, Internet of Things (IoT), dan Integrasi Sistem Hardware & Software.",
  keywords: ["Irfan Afandi", "IoT", "Internet of Things", "Hardware Software Integration", "Embedded System", "Next.js", "Full Stack Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="bg-[#030712] text-zinc-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
