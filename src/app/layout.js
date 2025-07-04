import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bingo Batallón 1 - Exploradores Salesianos de Don Bosco",
  description: "Aplicación para jugar al bingo del Batallón 1 de Exploradores Salesianos de Don Bosco. Herramienta interactiva para organizar partidas de bingo con seguimiento de premios y números seleccionados.",
  keywords: "bingo, exploradores, salesianos, don bosco, batallón 1, juego, premios",
  authors: [{ name: "Batallón 1 Exploradores Salesianos" }],
  openGraph: {
    title: "Bingo Batallón 1 - Exploradores Salesianos de Don Bosco",
    description: "Aplicación para jugar al bingo del Batallón 1 de Exploradores Salesianos de Don Bosco",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Logo Batallón 1 Exploradores Salesianos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bingo Batallón 1 - Exploradores Salesianos de Don Bosco",
    description: "Aplicación para jugar al bingo del Batallón 1 de Exploradores Salesianos de Don Bosco",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
