import React, { useEffect, useMemo } from 'react'
import { usePanierStore } from '../../../Hooks/Stores/usePanierStore'
import { useProductStore } from '../../../Hooks/Stores/useProductStore';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAnonymesUser } from '../../../Lib/Utils/Anonymes';

const Bag = () => {
  const panier = usePanierStore(state => state.panierLocal);
  const removeFromPanier = usePanierStore(state => state.removeFromPanier);
  const incrementQuantity = usePanierStore(state => state.incrementQuantity);
  const decrementQuantity = usePanierStore(state => state.decrementQuantity);
  const products = useProductStore(state => state.products);
  const allProduct = useProductStore(state => state.allProduct);
  const anonymeId = getAnonymesUser();
  const PRICE_VALUE = `Price_${anonymeId}`;

  useEffect(() => {
    allProduct();

  }, [allProduct]);
  console.log("Les produits sont :", products);
  //Association des produits avec le panier

  // Associe chaque entrée du panier avec son produit réel
  const panierAvecDetails = panier
    .map(item => {
      const produitComplet = products.find(p => p._id === item.produitId);
      if (!produitComplet) return null;
      return {
        ...produitComplet,
        quantity: item.quantity
      };
    })
    .filter(item => item !== null);

  console.log("Le panier est :", panierAvecDetails);
  const formatCurrency = (amount) => `$ ${parseFloat(amount).toFixed(2)}`;

  // Calcul du sous-total en fonction du panier
  const calculateSubtotal = (items) => items.reduce((total, item) => total + item.prix * item.quantity, 0);

  const EXTRA_FEES = {
    tax: 6.00,
    shipping: 20.00,
    discount: 6.00,
  };
  const subtotal = useMemo(() => calculateSubtotal(panierAvecDetails), [panierAvecDetails]);

  const invoiceBreakdown = [
    { label: "Subtotal", value: subtotal },
    { label: "Shipping and delivery", value: EXTRA_FEES.shipping },
    { label: "Tax", value: EXTRA_FEES.tax },
    { label: "Discount", value: EXTRA_FEES.discount },
  ]
  const Total = useMemo(() => subtotal + EXTRA_FEES.shipping - EXTRA_FEES.discount, [subtotal]);

  useEffect(() => {
    localStorage.setItem(PRICE_VALUE, Total);
  }, [Total]);

  return (
    <div className="px-6 md:px-40 py-3 mb-2 md:mb-8 h-[84vh]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] py-3 gap-6">

        {/** Panier container (plus large) */}
        <div className=" order-2 md:order-1 h-[68vh] overflow-y-auto py-3 px-3">
          <h3 className=" font-semibold text-xl md:font-bold  md:text-2xl text-gray-900 mb-4">Your Bag</h3>

          {panierAvecDetails.map((item) => (
            <div className="py-4 border-b border-b-gray-300" key={item._id}>
              <div className="flex gap-4" >
                <img
                  src={item.image}
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-md"
                  alt=""
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm md:text-base font-semibold">{item.marque}</h4>
                    <p className="text-gray-800 font-semibold text-sm md:text-base">
                      {formatCurrency(item.prix * item.quantity)}
                    </p>
                  </div>
                  <h4 className="text-base font-semibold text-gray-600">{item.nom}</h4>
                  <div className="inline-block md:flex  items-center gap-24 mt-3 md:mt-[90px] ">
                    <div className="border border-gray-300 py-1 px-3 w-[110px] mt-1 rounded-md flex justify-between">
                      <span
                        onClick={() => decrementQuantity(item._id)}
                        className="text-base font-bold text-gray-600 cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-full select-none"
                      >-</span>

                      <span className="p-1">{item.quantity}</span>

                      <span
                        onClick={() => incrementQuantity(item._id)}
                        className="text-base font-bold text-gray-600 cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-full select-none"
                      >+</span>
                    </div>

                    <div>
                      <button
                        onClick={() => removeFromPanier(item._id)}
                        className="mt-2 text-gray-600 underline text-sm"
                      >
                        Remove
                      </button>
                    </div>

                  </div>


                </div>
              </div>

            </div>
          ))}
        </div>

        {/** Zone de prix (plus petite) */}
        <div className="shadow-lg rounded-md bg-white  max-h-fit h-fit order-1 md:order-2">
          <div className="py-6 px-6 border-b border-b-gray-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Summary</h3>
            <div className="">
              {
                invoiceBreakdown.map((item, key) => (
                  <div className="flex justify-between sm:text-sm " key={key}>
                    <p className="text-gray-900 ">{item.label}</p>
                    <span className="text-gray-900">{formatCurrency(item.value)}</span>
                  </div>
                ))
              }

            </div>
          </div>

          <p className="text-gray-800 font-bold text-lg my-4 px-6  flex justify-between">
            Total:
            <span>{formatCurrency(Total)}</span>
          </p>
          <div className="px-6 py-6">
            <Link
              data-aos="flip-up"
              to={"/form"}
              className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold text-base transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black active:scale-95  flex gap-2 text-center items-center justify-center"
              aria-label="Add item to cart"
            >
              Sheckout
              <MoveRight />
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Bag
