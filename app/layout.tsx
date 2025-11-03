import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "🐿️",
  description: "My App Description",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Sign In</Link>
          </SignedOut>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
