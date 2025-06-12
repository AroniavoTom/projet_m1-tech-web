import React, { useState } from 'react'
import countries from "../../../Lib/Helpers/countries.json"
import { MoveRight } from 'lucide-react';
import { usePanierStore } from '../../../Hooks/Stores/usePanierStore';
import { useCommandeChange } from '../../../Hooks/Context/useCommandeChange';
import { Paiment_Types } from '../../../Lib/Helpers/PaymentType';
import toast from "react-hot-toast"
import { useCommandeStore } from '../../../Hooks/Stores/useCommandeStore';
import { getAnonymesUser } from '../../../Lib/Utils/Anonymes';
const CommandeFormulaire = () => {
    const panier = usePanierStore((state) => state.panierLocal);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.dial_code === "+1") || countries[0]);
    const { addCommande } = useCommandeStore();
    const anonymeId = getAnonymesUser();
    const PRICE_VALUE = `Price_${anonymeId}`;
    const PriceTotal = localStorage.getItem(PRICE_VALUE);
    const {
        state,
        handleClient,
        handlePaiement,
        handleClearData,
        checked,
        toggleChecked
    } = useCommandeChange();

    //Destructuration de l'état 
    const { Client, Paiement } = state;
    const { adress } = Client;

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dial_code.includes(searchTerm)
    );

    // Fonction utilitaire pour gérer le format
    const formatPhoneNumber = (phone, countryCode) => {
        const digits = phone.replace(/[^\d]/g, '');
        const codeDigits = countryCode.replace(/[^\d]/g, '');

        if (digits.startsWith(codeDigits)) {
            return countryCode + digits.slice(codeDigits.length);
        }
        return countryCode + digits;
    };

    // Handler du champ téléphone
    const handlePhoneChange = (e) => {
        handleClient({
            target: {
                name: 'telephone',
                value: formatPhoneNumber(e.target.value, selectedCountry.dial_code)
            }
        });
    };

    // Handler de sélection de pays
    const handleCountrySelect = (country) => {
        const prevCode = selectedCountry.dial_code;
        const newCode = country.dial_code;

        setSelectedCountry(country);
        setShowDropdown(false);
        setSearchTerm('');

        handleClient({
            target: {
                name: 'countryCode',
                value: newCode
            }
        });

        // Mise à jour intelligente du numéro
        handleClient({
            target: {
                name: 'telephone',
                value: Client.telephone.replace(prevCode, newCode)
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Données qu'on va envoyer dans la base de données 
        const formData = {
            panier: panier,
            client: {
                nom: Client.nom,
                prenom: Client.prenom,
                email: Client.email,
                telephone: Client.telephone,
                adress: {
                    codePostal: Client.adress.codePostal,
                    rue: Client.adress.rue,
                    ville: Client.adress.ville,
                    pays: Client.adress.pays,
                }
            },
            paiement: {
                mode: Paiement.mode,
                montant: PriceTotal,
            },
            receivedFacture: checked
        }
        try {
            const success = await addCommande(formData);
            if (success) {
                toast.success("Your buy successufully !")
                console.log("Le données qu'on va envoyer dans la base est là", formData);
                handleClearData.clearClient();
                handleClearData.clearPaiement();
            }

        } catch (error) {
            toast.error("Failed to buy !")
            console.error(error);
        }
    }
    return (

        <div className="bg-gray-50 h-screen my-auto py-2 md:py-4 overflow-y-auto">
            <div className="mx-2 md:mx-14 p-2 md:p-6  bg-white justify-center items-center shadow-md rounded-lg ">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>Step 2 of 2</span>
                        <span className="mx-2">•</span>
                        <span>Payment</span>
                    </div>
                </div>
                <form action="" className="py-3 " onSubmit={handleSubmit}>
                    <div>

                        <div className="pb-3">
                            <h3 className=" text-gray-700 text-base font-bold">Contact Information</h3>
                        </div>
                        <div className="border border-gray-100 p-2 md:p-6  rounded-md ">

                            <div className="flex flex-col md:flex-row  gap-14">

                                <div>
                                    <label className="block text-base text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="nom"
                                            value={Client.nom}
                                            onChange={handleClient}
                                            className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Jack"
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-base text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={Client.prenom}
                                            onChange={handleClient}
                                            className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Macklarein"
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-base text-gray-700 mb-1"> Email Address <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={Client.email}
                                            onChange={handleClient}
                                            className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="py-3 flex flex-col md:flex-row  gap-14">
                                {/* Phone Number Field - Version améliorée */}
                                <div>
                                    <label className="block text-base text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                    <div className="relative flex items-center">
                                        {/* Sélecteur de pays avec dropdown */}
                                        <div className="relative w-28">
                                            <div
                                                className="flex items-center justify-between py-2 px-3 border-b border-gray-300 cursor-pointer"
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                <span>{selectedCountry.flag} {selectedCountry.dial_code}</span>
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>

                                            {showDropdown && (
                                                <div className="absolute z-20 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search country..."
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                    {filteredCountries.map((country) => (
                                                        <div
                                                            key={country.code}
                                                            className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                            onClick={() => handleCountrySelect(country)}
                                                        >
                                                            <span className="mr-2">{country.flag}</span>
                                                            <span className="flex-1">{country.name}</span>
                                                            <span className="text-gray-500">{country.dial_code}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Champ téléphone avec préfixe */}
                                        <div className="flex-1 relative">

                                            <input
                                                type="tel"
                                                name="telephone"
                                                value={Client.telephone}
                                                onChange={handlePhoneChange}
                                                className="block w-full pl-4 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="123 456 7890"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className=" ">
                                    <h4 className="text-base font-medium text-gray-700">Shipping Address</h4>
                                    <div className="border border-gray-200 rounded-md  p-3 md:p-4">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">
                                                    Street Address <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="rue"
                                                        value={adress.rue}
                                                        onChange={handleClient}
                                                        className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                        placeholder="123 Main St"
                                                    />
                                                </div>

                                            </div>
                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">  ZIP/Postal Code <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="codePostal"
                                                        value={adress.codePostal}
                                                        onChange={handleClient}
                                                        className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                        placeholder="10001"
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-6 mt-6">
                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">    City <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="ville"
                                                        value={adress.ville}
                                                        onChange={handleClient}
                                                        className="w-full md:w-80   py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                        placeholder="New York"
                                                    />
                                                </div>

                                            </div>
                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">
                                                    Countries <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <select
                                                        name="pays"
                                                        onChange={handleClient}
                                                        className="w-full md:w-80   py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                                        required
                                                    >
                                                        {/* Option vide par défaut */}
                                                        <option value=""></option>
                                                        {
                                                            countries.map((item, key) => (
                                                            
                                                                    <option key={key} value={item.name}>{item.name}</option>
                                                               
                                                            ))
                                                        }

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="pt-6 pb-3">
                            <h3 className="text-gray-700 text-base font-bold">Payment Method</h3>
                        </div>
                        <div className="border border-gray-100 p-2 md:p-6 rounded-md">

                            <div className="flex flex-col md:flex-row  gap-14">

                                <div>
                                    <label className="block text-base text-gray-700 mb-1">
                                        Payment Method <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="mode"
                                            className="w-full md:w-80   py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                            onChange={handlePaiement}
                                            required
                                        >
                                            <option value=""></option>
                                            {
                                                Paiment_Types.map((type, key) => (
                                                    <option key={key} value={type.value}>{type.label} </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-base text-gray-700 mb-1"> Order Total </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="montant"
                                            value={PriceTotal}
                                            className="w-full md:w-80 px-8 py-1 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="152.00"
                                            readOnly
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="py-3">
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mt-2">
                                    <input
                                        type="checkbox"
                                        name="receivedFacture"
                                        checked={checked}
                                        onChange={toggleChecked}
                                        className="w-4 h-4 accent-blue-500 border-gray-300 rounded focus:ring-blue-700"
                                    />
                                    <span htmlFor="receipt" className="ml-2 block text-sm text-gray-700">
                                        Email me a receipt
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center py-3 ">
                        <button
                            className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            aria-label="Add item to cart"
                            type='submit'
                        >
                            Complet payment <MoveRight className="size-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommandeFormulaire
