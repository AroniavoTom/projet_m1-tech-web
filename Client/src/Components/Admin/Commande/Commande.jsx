import React, { useEffect } from 'react'
import { useCommandeStore } from '../../../Hooks/Stores/useCommandeStore'
import TableCommade from '../Table/TableCommade';
import { Keys } from '../../../Lib/Helpers/Keys';
import { Titles } from '../../../Lib/Helpers/Titles';

export const Commande = () => {
  const { commandes, allCommandes } = useCommandeStore();


  //UseEffect pour récupérer toutes les commandes
  useEffect(() => {
    allCommandes();
  }, [allCommandes])
  const FlatCommandes = commandes.map((cmd) => ({
    lastName: cmd.client.prenom,
    email: cmd.client.email,
    rue: `${cmd.client.adress.rue} à ${cmd.client.adress.ville}`,
    pays: cmd.client.adress.pays,
    montant: cmd.paiement.montant,
    receivedFacture: cmd.receivedFacture ? "True": "False",
  }));
  
  console.log("Commandes récupérées :", commandes);
  return (
    <div className="items-center flex flex-col h-[85vh] overflow-y-auto ">
      <div className="max-w-6xl w-full my-6  h-[85vh] overflow-y-auto">
        <TableCommade
          keys={Keys.Commande_Keys}
          data={FlatCommandes}
          titles={Titles.Commande_Titles}
        />
      </div>
    </div>
  )
}
