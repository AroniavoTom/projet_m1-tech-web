import { create } from "zustand"
import { getAnonymesUser } from "../../Lib/Utils/Anonymes"

const anonymeId = getAnonymesUser()
const LOCAL_STORAGE_KEY = `Panier_${anonymeId}`

export const usePanierStore = create((set, get) => {
    return {
        panierLocal: [],
       

        // Appelé dans ton useEffect au premier chargement
        initPanier: () => {
            const storedPanier = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
            set({ panierLocal: storedPanier }) // 👈 on arrête le loading ici
        },

        addToPanier: (produit) => {
            const panier = get().panierLocal;
            const index = panier.findIndex(item => item.produitId === produit.produitId);
            let updated;
            if (index !== -1) {
                updated = [...panier];
                updated[index].quantity += produit.quantity;
            } else {
                updated = [...panier, produit];
            }
            set({ panierLocal: updated });
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        },

        removeFromPanier: (id) => {
            const updated = get().panierLocal.filter((produit) => produit.produitId !== id);
            set({ panierLocal: updated });
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        },

        clearPanier: () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            set({ panierLocal: [] });
        },

        getTotalPrice: () => {
            const { panierLocal } = get();
            return panierLocal.reduce((total, produit) => total + produit.prix, 0);
        },

        getPanier: () => get().panierLocal,

        incrementQuantity: (id) => {
            const panier = get().panierLocal;
            const updated = panier.map(item =>
                item.produitId === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            set({ panierLocal: updated });
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        },

        decrementQuantity: (id) => {
            const panier = get().panierLocal;
            const updated = panier.map(item =>
                item.produitId === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            set({ panierLocal: updated });
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        }
    }
})

