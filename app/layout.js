import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrappper from "./components/SessionWrappper";
import AnimatedBackground from "./components/bg";
export const metadata = {
  title: "BuymeaChai",
  description: "get funded by your fans",
};
const f = Poppins({
  subsets: ["latin"],
  weight: ['200', '400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <body className={`${f.className} overflow-x-hidden h-full`}
      > <SessionWrappper>

          {/* <div className="min-h-full w-full bg-slate-950 text-white relative z-0
  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
  bg-[size:14px_24px]"> */}
<AnimatedBackground>
<Navbar />
{children}
<Footer />
</AnimatedBackground>


        
          {/* </div> */}
        </SessionWrappper>

      </body>
    </html>
  );
}
