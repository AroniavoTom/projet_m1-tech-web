import React, { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, User } from "lucide-react"
import { MenuList } from "../../../Lib/Helpers/MenuList"
import { Link, useLocation } from 'react-router-dom'; // 👈 Ajouter useLocation
import Logo2 from "../../../Assets/logo.svg";
import { useMenuStore } from '../../../Hooks/Stores/useMenuStore';

const NavBarAdmin = () => {
  const { activeMenu, setActiveMenu } = useMenuStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // 👈 Obtenir l'URL actuelle

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // 👇 Mettre à jour le menu actif automatiquement selon l'URL
  useEffect(() => {
    const current = MenuList.find(menu => menu.link === location.pathname);
    if (current && current.name !== activeMenu) {
      setActiveMenu(current.name);
    }
  }, [location.pathname, activeMenu, setActiveMenu]);

  // 👇 Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 md:px-40 border-b border-gray-100 shadow-md">
      <div className="flex md:flex-row justify-between items-center">
        <div className="items-center">
          <img src={Logo2} alt="" />
        </div>
        <div className="flex items-center md:mb-0">
          <ul className="flex gap-10 pt-1">
            {MenuList.map((menu) => (
              <li
                key={menu.id}
                className={`py-1 cursor-pointer ${activeMenu === menu.name
                    ? "border-b-2 border-b-blue-600"
                    : "hover:border-b-2 hover:border-gray-300 hover:bg-gray-100 px-3"
                  }`}
              >
                <Link
                  to={menu.link}
                  className="px-3 py-3 block"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 my-1">
          <div className="p-2 rounded-full cursor-pointer border border-gray-200 bg-gray-100 text-gray-900">
            <Bell />
          </div>

          <div className="relative cursor-pointer" ref={dropdownRef}>
            <div
              className="p-2 rounded-full border border-gray-200 bg-gray-100 text-gray-900 flex items-center"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <User />
              <div className="rounded-full -right-0 bottom-1 absolute -translate-x-1/4 translate-y-1/2 bg-gray-400 z-30">
                <ChevronDown className={`size-3 transition-all duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 z-50 w-40 rounded-md bg-white shadow-lg py-1 mt-2">
                <div className="space-y-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBarAdmin;
