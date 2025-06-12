import { useState } from "react";
import { InitialData } from "../../Lib/Utils/InitialData";

export function useCommandeChange() {
    const [state, setState] = useState(InitialData)
    const [checked, setChecked] = useState(InitialData.Paiement.receivedFacture);
    //Changement d'état au niveau du client
    const handleClient = (e) => {
        const { name, value } = e.target;
        // Mise à jour de l'état du client
        if (["codePostal", "rue", "ville", "pays"].includes(name)) {
            setState((state) => ({
                ...state,
                "Client": {
                    ...state.Client,
                    "adress": {
                        ...state.Client.adress,
                        [name]: value
                    }
                }
            }));
        } else {
            // Si le champ est un champ direct de Client (nom, prenom, etc.)
            const Client = {
                ...state.Client,
                [name]: value
            }
            setState((state) => ({
                ...state,
                "Client": Client
            }))
        }
    };
    //Changement d'état au niveau du paiement
    const handlePaiement = (e) => {
        const { name, value } = e.target;
        const Paiement = {
            ...state.Paiement,
            [name]: value
        }
        setState((state) => ({
            ...state,
            "Paiement": Paiement
        }))
    }
    const toggleChecked = () => {
        setChecked(!checked);
    }
    const handleClearData = {
        clearClient: () => {
            setState(prev => ({
                ...prev,
                Client: InitialData.Client // Ne réinitialise QUE Client
            }));
        },
        clearPaiement: () => {
            setState(prev => ({
                ...prev,
                Paiement: InitialData.Paiement // Ne réinitialise QUE Paiement
            }));
        }
    };
    return {
        state,
        handleClient,
        handlePaiement,
        handleClearData,
        checked,
        toggleChecked
    }

}