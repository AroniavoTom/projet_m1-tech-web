import { create } from "zustand"
import { AxiosInstance } from "../../Lib/Api/axios"
import { ADD_USER, LOGIN, LOGOUT } from "../../Lib/Utils/EndPoint"

export const useAuthificateStore = create((set) => ({
    authUser: null,
    isAuthentificate: false,
    user: null,
    loading: false,
    error: null,
    message: "",

    addUser: async (dataUser) => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.post(ADD_USER, dataUser);
            set({ user: result.data });
            return result.data;
        } catch (error) {
            console.log("Erreur lors de l'ajout d'un utilisateur ", error)
            set({ error: error.message || "Erreur inconue" })
        } finally {
            set({ loading: false })
        }
    },
    login: async (dataUser) => {
        set({ loading: true, error: null })
        try {
            const result = await AxiosInstance.post(LOGIN, dataUser);
            set({ user: result.data, isAuthentificate: true })
            return result.data;
        } catch (error) {
            console.log("Erreur lors de l'authentification ", error)
            set({ error: error.message || "Erreur inconue" })
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        try {
            const result = await AxiosInstance.get(LOGOUT);
            set({ message: result.message })
            return result.message;
        } catch (error) {
            console.log("Erreur lors de la déconnexion ", error)
            set({ error: error.message || "Erreur inconue" })
        }
    },
    getAuthentificated:async()=>{
        set({loading:true,error:true})
    }
}))