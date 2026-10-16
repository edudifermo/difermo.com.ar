import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduardo Di Fermo | Análisis de Riesgos y Seguros",
  description: "Asesoramiento personalizado en seguros para personas, comercios y empresas. Análisis de riesgos con el respaldo de Valcarce-Deve Brokers.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={manrope.variable}>{children}</body></html>;
}
