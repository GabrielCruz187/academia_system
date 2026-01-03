import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Corpus Maria - Matrícula Online",
  description: "Descubra a elegância e graça do balé clássico. Junte-se à nossa academia de dança premiada.",
  generator: "",
  icons: {
    icon: [
      {
        url: "/logo2.png",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
