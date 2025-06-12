export const getAnonymesUser = () => {
    const USER_KEY="Anonymes_User";
     let anonymeId = localStorage.getItem(USER_KEY);
     if (!anonymeId) {
        // Si l'ID n'existe pas, on le génère
        anonymeId="user_" + Date.now();
        localStorage.setItem(USER_KEY, anonymeId);

     }
     return anonymeId;
        
}