import { Pencil, Upload, X } from 'lucide-react';
import React from 'react';

const TableProduit = ({ titles, data, keys }) => {
    return (
        <div className="w-full overflow-x-auto  scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        {titles.map((title, index) => (
                            <th
                                key={index}
                                className={`px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase dark:text-gray-300 ${index === titles.length - 1 ? 'text-right' : ''}`}
                            >
                                {title}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase dark:text-gray-300">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 transition-opacity duration-300 ease-in-out">
                    {
                        data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 transition duration-200">
                                    {idx+1}
                                </td>
                                {
                                    keys.map((key, index) => (
                                        <td
                                            key={index}
                                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 transition duration-200 ${index === keys.length - 1 ? 'text-right' : ''}`}
                                        >
                                            {key === "image" ? (
                                                <img src={row[key]}
                                                    alt="Produit"
                                                    className=" w-24 h-14 object-cover translate-x-24 rounded-md "
                                                />
                                            ) : (
                                                row[key]
                                            )}
                                        </td>
                                    ))
                                }
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right flex justify-end gap-10">
                                    {/* Boutons d’action ici */}
                                    <button className="text-red-400 py-2 px-2 hover:text-red-500 transition-all duration-300 ease-in-out hover:scale-x-110  ring-current rounded-full">
                                        <X className="shadow-red-500" />
                                    </button>
                                    <button className="text-green-400 py-2 px-2 hover:text-green-500 transition-all duration-300 ease-in-out hover:scale-110 rounded-full">
                                        <Pencil className="size-5 shadow-green-500" />
                                    </button>
                                    <button className="text-blue-400 py-2 px-2 hover:text-blue-500 transition-all duration-300 ease-in-out hover:scale-110 rounded-full" >
                                        <Upload className="size-5 shadow-blue-500" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(TableProduit);

