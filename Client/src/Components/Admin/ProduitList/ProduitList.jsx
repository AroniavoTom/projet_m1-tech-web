import { Plus } from "lucide-react"
import { useModalStore } from "../../../Hooks/Stores/useModalStore";
import ProduitFormulaire from "../../Customs/Formulaires/ProduitFormulaire";
import { useProductStore } from "../../../Hooks/Stores/useProductStore";
import { useEffect } from "react";
import TableProduit from "../Table/TableProduit";
import { Keys } from "../../../Lib/Helpers/Keys";
import { Titles } from "../../../Lib/Helpers/Titles";



const ProduitList = () => {
    const { showModal, OpenModal } = useModalStore();
    const { allProduct, products } = useProductStore();

    useEffect(() => {
        allProduct();
    }, [allProduct])
    console.log("Les données sont :", products);
    return (
        <div className="items-center flex flex-col h-[85vh] overflow-y-auto ">
            <div className="flex items-center justify-between bg-white shadow px-4 py-2 rounded-md w-full max-w-6xl">
                <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                <button
                    onClick={() => OpenModal()}
                    type="button"
                    className="bg-blue-50 text-blue-800 border border-blue-600 hover:text-white px-4 py-1.5 rounded hover:bg-blue-700 transition duration-200 flex gap-2 items-center "
                >
                    <Plus className="size-3" /> Add Product
                </button>
                {
                    showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-8">
                            <div className="w-full max-w-2xl">
                                <ProduitFormulaire />
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="max-w-6xl w-full my-6  h-[85vh] overflow-y-auto">
                <TableProduit
                    keys={Keys.Product_Keys}
                    data={products}
                    titles={Titles.Product_Titles}
                />
            </div>

        </div>
    )
}

export default ProduitList
