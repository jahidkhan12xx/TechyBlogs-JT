import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/Context/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Techy Blog",
  description: "A blog website for Tech Enthuist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <div className=" mx-auto container">
            <NavBar />
          </div>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
