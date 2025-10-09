import { Work_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Section from "@/components/Section"
import Footer from "@/components/Footer"
import Image from "next/image"
import footerBg from "@/../public/bg-assets/footer.png"

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
    <html lang="en" className={`${workSans.variable} overscroll-none`}>
      <body
        className={`bg-dark text-light font-body relative overflow-x-hidden antialiased`}
      >
        <div className="grid grid-cols-14 gap-x-6 px-3">
          <Navbar />
          <Section as="main">{children}</Section>
          <Footer />
        </div>

        <Image
          src={footerBg}
          alt=""
          className="absolute right-0 bottom-0 -z-10 w-80 sm:w-120 lg:w-160 xl:w-200"
        />
      </body>
    </html>
  )
}
