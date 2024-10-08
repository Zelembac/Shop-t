import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import icon from "./images/shopping-bag.png";
import Link from "next/link";
import { StoreProvider } from "./redux/StoreProvider";
import CartIcon from "./conponents/CartIcon";
import FooterItems from "./conponents/FooterItems";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen font-geist-sans bg-slate-500 flex flex-col`}
        >
          <header className="bg-slate-800 h-[80px] w-full flex justify-between items-center p-3 fixed top-0 z-50">
            <Link href="/">
              <Image src={icon} width={70} height={70} alt="Shopping bag icon" />
            </Link>
            <CartIcon />
          </header>
          <main className="mt-[80px] h-[90vh]">{children}</main>
          <footer className="bg-slate-500 h-[20vh] text-xl flex items-center justify-center ">
            <FooterItems></FooterItems>
          </footer>
        </body>
      </html>
    </StoreProvider>
  );
}
