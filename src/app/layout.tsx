import { Work_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable}`}>
      <body className={`antialiased bg-dark text-light font-body`}>
        <div className="px-3 grid grid-cols-14 gap-x-6">
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  )
}
