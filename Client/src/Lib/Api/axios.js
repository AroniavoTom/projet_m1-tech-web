//Importation de l'axios 
import axios from "axios";

//URl
//const Url = "https://projet-m1-tech-web.onrender.com/api";
const Url = "http://localhost:5000/api";

//Création d'une instance Axios configurable 
export const AxiosInstance = axios.create({
    baseURL: Url,
    withCredentials: true, //Indispensable pour envoyer automatiquement les cookies
   
})
