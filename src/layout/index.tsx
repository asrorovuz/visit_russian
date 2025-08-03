import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import heroImg from "../assets/hero.png";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (mainRef.current) {
        const height = mainRef.current.offsetHeight;
        const screenHeight = window.innerHeight;
        setIsShort(height < screenHeight);
      }
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <>
      <header className="w-full absolute z-50 top-5">
        <Navbar />
      </header>
      <main
        ref={mainRef}
        className={`relative z-10 w-full min-h-screen pb-[96px] ${
          isShort ? "single-bg" : "main-bg"
        }`}
      >
        <div className="absolute h-[60vh] w-full bg-hero overflow-hidden">
          <img
            src={heroImg}
            alt="Mountains"
            className="absolute -top-20 inset-0 w-full h-full opacity-[7%] z-10"
          />
        </div>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
