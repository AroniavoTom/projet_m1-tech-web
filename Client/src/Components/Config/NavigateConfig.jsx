import { useLayoutEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Customs/NavBar/NavBar";
import Footer from "../Customs/Footer/Footer";
const Layout = () => {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useLayoutEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      {/* NavBar fixed */}
      <div ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white">
        <NavBar />
      </div>

      {/* Contenu avec padding-top dynamique */}
      <div
        className="h-screen overflow-y-auto"
        style={{ paddingTop: `${navHeight}px` }}
      >
        {/* Contenu principal qui scroll */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
