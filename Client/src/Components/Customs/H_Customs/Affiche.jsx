
import ImageBack from "../../../Assets/Frame 1168.svg";
import { MoveRight } from 'lucide-react';
const Affiche = () => {
    return (
        <div className="bg-gray-200 rounded-3xl px-6 py-8 sm:px-3 lg:px-10 flex flex-col md:flex-row items-center md:justify-between h-auto">

            {/* Image au-dessus sur mobile */}
            <div className="order-1 md:order-2 mb-4 md:mb-0"
            data-aos="zoom-in"
            >
                <img
                    src={ImageBack}
                    alt="Illustration"
                    className="w-[250px] md:w-[370px] object-contain mx-auto"
                />
            </div>

            {/* Titre en dessous de l'image sur mobile, à gauche sur desktop */}
            <div className="order-2 md:order-1 text-center md:text-left">
                <h2 data-aos="fade-up" className="text-xl md:text-2xl font-bold text-[#EC5E2A]">25% OFF</h2>
                <p data-aos="fade-up" data-aos-durration="200" className=" text-3xl md:text-4xl font-bold">Summer Sale</p>
                <span data-aos="fade-up" className=" text-gray-500 text-sm md:text-base">Discover our summer styles whith discout</span>
                  <div className="mt-6">
                <button
                data-aos="fade-right"
                    className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold text-base transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black active:scale-95  flex gap-2 text-center items-center justify-center"
                    aria-label="Add item to cart"
                >
                    Shop Now 
                    <MoveRight /> 
                </button>
            </div>
            </div>
          

        </div>

    )
}

export default Affiche
