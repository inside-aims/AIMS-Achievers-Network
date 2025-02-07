import { Cinzel, Poppins } from "next/font/google"
import type React from "react" // Import React

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
})

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${poppins.variable}`}>{children}</body>
    </html>
  )
}