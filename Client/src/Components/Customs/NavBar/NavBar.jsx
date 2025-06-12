import { useNavigate, useLocation, Link } from "react-router-dom";
import ShoppingBag from "../../../Assets/cart.svg";
import Logo2 from "../../../Assets/logo.svg";
import { usePanierStore } from "../../../Hooks/Stores/usePanierStore";
import { useState } from "react";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const panierLocal = usePanierStore(state => state.panierLocal);
  const totalQuantity = panierLocal.length;
  const navigate = useNavigate();
  const location = useLocation(); // 👈 pour obtenir le chemin actuel
  //Dropdown
  const toggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  }
  const closeDropdown = () => {
    setShowDropdown(false);
  }
  const handleNavigateAdmin = () => {
    closeDropdown();
    setTimeout(() => {
      navigate("/login");
    }, 300);
  }

  const handleNavigate = () => {
    if (totalQuantity > 0 && location.pathname !== "/bag") {
      navigate(`/bag`);
    }
  }

  return (
    <div className="items-center border-b border-gray-200 py-2 px-4 md:px-40">
      <nav className="flex justify-between items-center">
        <div className="items-center cursor-pointer duration-300 transition-all ease-in-out hover:scale-105"
          onClick={toggleShowDropdown}
        >
          <img src={Logo2} alt="Logo" />
        </div>
        {
          showDropdown && (
            <div className="absolute z-50 w-40 top-12 rounded-md bg-white shadow-lg py-1 mt-2">
              <div className="space-y-1">
                <button

                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleNavigateAdmin}
                >
                  Admin
                </button>

              </div>
            </div>
          )
        }
        <div>
          <button
            type="button"
            onClick={handleNavigate}
            className="group border border-black py-2 px-6 rounded-md hover:bg-gray-800 hover:outline-none focus:ring-offset-2 focus:ring-black active:scale-95 transition duration-300 ease-in-out flex items-center gap-2 relative"
          >
            <div className="relative">
              <img src={ShoppingBag} alt="Panier" className="w-6 h-6 group-hover:invert" />

              {/* ✅ Masquer le badge si on est sur /bag */}
              {totalQuantity > 0 && location.pathname !== "/bag" && (
                <span className="absolute top-2 left-[94px] bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {totalQuantity}
                </span>
              )}
            </div>

            <span className="group-hover:text-white">View Cart</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
