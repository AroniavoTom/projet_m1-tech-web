// Description d'un produit
const DESCRIPTION = {
    generale: "",
    specification: [] // Ex : ["Semelle en caoutchouc", "Résiste à l'eau"]
};

// Contenu du panier (un item)
const CONTENU = {
    quantity: null,         // Exemple : 1, 2, etc.
    produitId: ""           // ID MongoDB du produit
};

// Initialisation des données de l'application
export const InitialData = {
    Produit: {
        image: "",          // Image principale
        marque: "",         // "Nike", "Adidas", etc.
        nom: "",
        prix: "",         // Nom du produit
        description: DESCRIPTION,
        autreColor: [       // Autres couleurs disponibles
            {
                image: "",  // URL de l'image
                color: ""   // Nom de la couleur : "Black", "White", etc.
            }
        ]
    },

    Panier: {
        contenu: [CONTENU]  // Liste des produits dans le panier
    },
    Client: {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adress: {
            codePostal: "",
            rue: "",
            ville: "",
            pays: "",
        }
    },
    Paiement: {
        mode: "",
        montant: "",
        receivedFacture:false
    }

};

// Initialisation des données de l'utilisateur
export const User = {
    username: "",
    email: "",
    password: "",
    profile: "",
    confirmPassword: ""
};


