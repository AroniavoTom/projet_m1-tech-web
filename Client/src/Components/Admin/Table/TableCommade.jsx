
import React from 'react';

const TableCommande = ({ titles, data, keys }) => {
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
                                    {idx + 1}
                                </td>
                                {
                                    keys.map((key, index) => (
                                        <td
                                            key={index}
                                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 transition duration-200 ${index === keys.length - 1 ? 'text-right' : ''}`}
                                        >
                                            {key === 'receivedFacture' ? (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold 
            ${row[key] ? 'bg-blue-400' : 'bg-red-400'}`}
                                                >
                                                    {row[key] ? 'Facturé' : 'Non facturé'}
                                                </span>
                                            ) : (
                                                row[key]
                                            )}
                                        </td>
                                    ))
                                }
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right flex justify-end gap-10">
                                    {/* Boutons d’action ici */}

                                    <button
                                        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out hover:scale-105 rounded-full px-3 py-1 hover:underline"
                                        title="Voir les détails"
                                    >                                  
                                        Voir détails
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

export default React.memo(TableCommande);
