import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KisanDirect | Direct Farm-to-Consumer Agri Marketplace (SIH26033)",
  description: "Eliminating intermediary exploitation in agricultural supply chains. Direct connection between farmers and consumers with AI price forecasting, APMC benchmarks, transparent value distribution scorecards, and escrow logistics tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
