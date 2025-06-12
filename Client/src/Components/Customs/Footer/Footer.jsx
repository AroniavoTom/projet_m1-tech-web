import React from 'react'
import Logo2 from "../../../Assets/logo-1.svg";
import { Instagram, Twitter, Youtube } from 'lucide-react';
const Footer = () => {
    return (
        <div className="items-center bg-gray-900 py-2 px-4 md:px-40">
           <nav className="flex md:flex-row  flex-wrap items-center justify-between gap-2 md:gap-4 text-center">
                <div className="items-center order-1">
                    <img src={Logo2} className="" alt="Logo" />
                </div>
                <div className="order-3 md:order-2 hidden md:inline-block">
                    <span className="text-gray-300 text-base "> © 2023 dot cards text task, All rights reserved </span>
                </div>
                <div className="flex flex-row items-center gap-3 md:gap-6 order-2 md:order-3">
                    <div className=" p-2 bg-gray-800 rounded-full cursor-pointer  " > <Instagram className=" text-gray-300 size-3 md:size-4  hover:scale-125 ease-in-out duration-300 transition-all hover:text-gray-200" /></div>
                    <div className=" p-2 bg-gray-800 rounded-full  "> <Twitter className=" text-gray-300 size-3 md:size-4  hover:scale-125 ease-in-out duration-300 transition-all cursor-pointer hover:text-gray-200" /></div>
                    <div className=" p-2 bg-gray-800 rounded-full "> <Youtube className=" text-gray-300 size-4 md:size-5 hover:scale-125 ease-in-out duration-300 transition-all cursor-pointer hover:text-gray-200 " /></div>
                </div>
                {/* Ligne suivante automatiquement grâce au wrap */}
                <div className=" text-gray-300 text-sm order-2 inline-block md:hidden">
                    © 2023 dot cards text task, All rights reserved
                </div>
            </nav>
        </div>
    )
}

export default Footer
