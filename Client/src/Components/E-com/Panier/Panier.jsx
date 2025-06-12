import React, { useEffect, useState } from 'react';
import { useProductStore } from '../../../Hooks/Stores/useProductStore';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCountStore } from '../../../Hooks/Stores/useCountStore';
import { useParams } from 'react-router-dom';
import { usePanierStore } from '../../../Hooks/Stores/usePanierStore';
import { toast } from 'react-hot-toast';

const Panier = () => {
  const { allProduct, loading, error, products } = useProductStore();
  const panierLocal = usePanierStore(state => state.panierLocal);
  const addToPanier = usePanierStore(state => state.addToPanier);
  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const count = useCountStore(state => state.count);
  const { add, remove } = useCountStore(state => state.setCount);
  const { id } = useParams();

  useEffect(() => { allProduct(); }, [allProduct]);
  useEffect(() => { setColorIndex(0); }, [index]);
  useEffect(() => {
    if (products.length > 0 && id) {
      const i = products.findIndex(p => p._id === id);
      if (i !== -1) {
        setIndex(i);
        setColorIndex(0);
      }
    }
  }, [products, id]);

  const handleIndex = {
    next: () => setIndex((p) => (p + 1) % products.length),
    prev: () => setIndex((p) => p === 0 ? products.length - 1 : p - 1),
  };

  if (loading) return <Loading />;
  if (error) return <p>Erreur : {error}</p>;
  if (!products.length) return <p>Aucun produit trouvé.</p>;

  const { _id, nom, marque, image, prix, description, autreColor } = products[index];
  const { generale, specification } = description;

  const panierSubmit = () => {
    if (count <= 0) {
      toast.error("La quantité doit être supérieure à zéro.");
      return;
    }
    addToPanier({ produitId: _id, quantity: count });
    toast.success("Produit ajouté au panier !");
    console.log("Panier:", panierLocal);
  };

  return (
    <div className="px-4 md:px-32 py-8 space-y-12 h-[87vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE + NAV */}
        <div className="rounded-2xl p-0 flex flex-col items-center">
        <img
  src={image}
  alt={nom}
  className="w-[546px] h-[375px] object-cover rounded-[20px]"
/>
           {/* Navigation */}
    <div className="flex items-center justify-between w-[546px] mt-6">
      <button
        onClick={handleIndex.prev}
        className="bg-white rounded-full p-2 shadow hover:shadow-lg transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex space-x-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-transform ${
              i === index
                ? 'bg-gray-800 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <button
        onClick={handleIndex.next}
        className="bg-white rounded-full p-2 shadow hover:shadow-lg transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
        </div>

        {/* INFOS + CTA */}
        <div
  className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between"
  style={{ width: '528px', height: '443px', left: '90px', position: 'relative' }} // pour décaler à gauche
>
  <div>
    <p className="uppercase text-sm text-gray-500">{marque}</p>
    <h2 className="text-2xl font-bold mt-1">{nom}</h2>
    <p className="text-xl text-gray-900 font-semibold mt-4">${prix}</p>
  </div>

  <div className="mt-8 space-y-6">
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">Quantité</p>
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
        <button
          onClick={remove}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
        >
          −
        </button>
        <span className="px-6 text-center text-gray-800">{count}</span>
        <button
          onClick={add}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>
    </div>
    <button
      onClick={panierSubmit}
      className="w-full py-4 bg-black text-white rounded-lg text-base font-semibold hover:bg-gray-900 transition active:scale-95"
    >
      Add to Cart
    </button>
  </div>
</div>

      </div>

      {/* DESCRIPTION + AUTRES COULEURS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 text-sm mb-4">{generale}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            {specification.map((spec, idx) => (
              <li key={idx}>{spec}</li>
            ))}
          </ul>
        </div>

        <div
  className="relative rounded-2xl p-6 flex items-center justify-center group"
  style={{ left: '-50px', position: 'relative' }} // pour décaler à gauche
>
  {autreColor?.[colorIndex]?.image && (
    <>
      <img
        src={autreColor[colorIndex].image}
        alt={`Color ${colorIndex + 1}`}
        style={{ width: '528px', height: '373px' }} // largeur et hauteur fixes
        className="object-contain"
      />
      {autreColor.length > 1 && (
        <>
          <button
            onClick={() =>
              setColorIndex((p) => (p === 0 ? autreColor.length - 1 : p - 1))
            }
            className="absolute left-4 bg-white bg-opacity-60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() =>
              setColorIndex((p) => (p === autreColor.length - 1 ? 0 : p + 1))
            }
            className="absolute right-4 bg-white bg-opacity-60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}
    </>
  )}
</div>

      </div>
    </div>
  );
};

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-16 w-16 border-t-2 border-b-2 border-gray-900 rounded-full" />
  </div>
);

export default Panier;
