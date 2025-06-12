import React, { useEffect } from 'react'
import { useProductStore } from '../../../Hooks/Stores/useProductStore';
import { useNavigate } from 'react-router-dom';
import AOS from "aos"

const SectionAffiche = () => {
    const { allProduct, loading, error, products } = useProductStore();
    const navigate = useNavigate();
    useEffect(() => {
        const loadProducts = async () => {
            await allProduct();
            AOS.refresh(); // Rafraîchit AOS après le chargement des données
        };
        loadProducts();
    }, [allProduct]);

    const handleNavigue = (id) => {
        console.log("Le produit est :", id);
        navigate(`/panier/${id}`);
    }
     if (loading) return <Loading />
    return (
        <div className="py-4">
            <div className="py-3" data-aos="zoom-out" data-aos-delay="300">
                <h3 className="text-xl font-bold text-gray-900">Explore our latest drops</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-4">

                {/* Carte produit */}
                {products.map((product, key) => (
                    <div
                        key={key}
                        className="bg-white rounded-md py-4 "
                      
                    >
                        {/* Image du produit */}

                        <img
                            src={product.image}
                            alt={product.nom}
                            onClick={() => handleNavigue(product._id)}
                            className="w-[265px] h-72 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
                        />


                        <div className="mt-4">
                            <h3 className="text-sm text-gray-900 font-medium">{product.nom}</h3>
                            <p className="text-sm text-gray-500">{product.marque}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mt-2">$ {product.prix}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
export default SectionAffiche
