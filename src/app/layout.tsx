import { Work_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Section from "@/components/Section"

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
    <html lang="en" className={`${workSans.variable} overscroll-y-none`}>
      <body
        className={`bg-dark text-light font-body overflow-x-hidden antialiased`}
      >
        <div className="grid grid-cols-14 gap-x-6 px-3">
          <Navbar />
          <Section as="main">{children}</Section>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  )
}
