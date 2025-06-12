import { create } from "zustand";
import { AxiosInstance } from "../../Lib/Api/axios";
import { ADD_PRODUCT, ALL_PRODUCT, DELETE_PRODUCT, ONE_PRODUCT } from "../../Lib/Utils/EndPoint";

export const useProductStore = create((set, get) => ({
    products: [],
    product: null,
    newProduct: null,
    error: null,
    loading: false,
    setProducts: (products) => set({ products }),
    setProduct: (product) => set({ product }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),

    //Add product 
    addProduct: async (data) => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.post(ADD_PRODUCT, data);
            set({ newProduct: result.data });
            get().allProduct();
            return result.data;
        } catch (error) {
            console.log("Erreur lors derrore la tendative d'ajout de produuit", error);
            set({ error: error.message || " Erreur inconue !" });
        } finally {
            set({ loading: false });
        }
    },
    allProduct: async () => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.get(ALL_PRODUCT);
            const {message, data}=result.data;
            set({products:data })
            return result.data;
        } catch (error) {
            console.log("Erreur lors de la récupération des produits", error);
            set({ error: error.message || "Erreur inconue ! " })
        } finally {
            set({ loading: false });
        }
    },
    oneProduct: async (id) => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.get(ONE_PRODUCT.replace(":id", id));
            set({ product: result.data, loading: true })
            return result.data;
        } catch (error) {
            console.log("Erreur lors de la récupération d'un produit", error)
            set({ error: error.message || "Erreur inconue" })
        } finally {
            set({ loading: false });
        }
    },
    deleteProduct: async (id) => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.post(DELETE_PRODUCT.replace(":id", id));
            await get().allProduct();
            return result.data;
        } catch (error) {
            console.log("Erreur lors de la tendative de suppression d'un produit");
            set({ error: error.message || "Erreur inconue" })
        }
    }

}))