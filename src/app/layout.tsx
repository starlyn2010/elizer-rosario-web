import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elizer Rosario Torres | Candidato a Regidor - PRM Sabana Perdida",
  description:
    "Elizer Rosario Torres, candidato a Regidor por el PRM en Sabana Perdida. Docente, líder comunitario y servidor público. Una nueva generación de funcionarios que trabajan por y para la comunidad.",
  keywords: [
    "Elizer Rosario Torres",
    "Regidor",
    "PRM",
    "Sabana Perdida",
    "Santo Domingo",
    "candidato",
    "elecciones",
    "lider comunitario",
    "docente",
  ],
  authors: [{ name: "Elizer Rosario Torres" }],
  openGraph: {
    title: "Elizer Rosario Torres | Candidato a Regidor - PRM Sabana Perdida",
    description:
      "Una nueva generación de funcionarios que trabajen por y para la comunidad.",
    locale: "es_DO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
