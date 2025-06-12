import { create } from "zustand";
import { AxiosInstance } from "../../Lib/Api/axios"
import { ADD_COMMANDE, ALL_COMMANDE } from "../../Lib/Utils/EndPoint";
//Mettre en oeuvre le store pour le commande 
export const useCommandeStore = create((set) => ({
    commande: null,
    loading: false,
    error: null,
    commandes: [],

    //Add commande
    addCommande: async (data) => {
        set({ loading: true, error: null });
        try {
            const success = await AxiosInstance.post(ADD_COMMANDE, data);
            set({ commande: success.data });
            return success.data;
        } catch (error) {
            set({ error: error.message || "Erreur inconnue !" })
            console.log("Erreur lors de l'envoie du commande!")
        } finally {
            set({ loading: false })
        }
    },
    //Get all commandes
    allCommandes: async () => {
        set({ loading: true, error: null });
        try {
            const success = await AxiosInstance.get(ALL_COMMANDE);
            set({ commandes:success.data.commandes});
            return success.data;
        } catch (error) {
            set({ error: error.message || "Erreur inconnue !" })
            console.log("Erreur lors de la récupération des commandes!")
        } finally {
            set({ loading: false })
        }
    }
}))