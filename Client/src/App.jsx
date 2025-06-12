import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProduitList from "./Components/Admin/ProduitList/ProduitList"
import NavigateConfig from "./Components/Config/NavigateConfig"
import { Commande } from "./Components/Admin/Commande/Commande"
import LayoutAdmin from "./Components/Config/LayoutAdmin"
import Home from "./Components/E-com/Home/Home"
import Panier from "./Components/E-com/Panier/Panier"
import Bag from "./Components/E-com/Bag/Bag"
import Login from "./Components/Auth/Login"
import CommandeFormulaire from "./Components/Customs/Formulaires/CommandeFormulaire"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css"; // Importation du fichier CSS d'AOS


const App = () => {
  // Initialisation d'AOS
  useEffect(() => {
    AOS.init({
      offset: 120, // Réduisez cette valeur
      duration: 600,
      easing: 'ease-out-quad',
      once: false,
      mirror: true,
      throttleDelay: 50, // Vérification plus fréquente
      disable: false
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout contenant NavBar */}
        <Route element={<NavigateConfig />}>
          <Route path="/panier/:id" element={<Panier />} />
          <Route path="/" element={<Home />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/form" element={<CommandeFormulaire />} />
        </Route>
        <Route path="/admin/" element={<LayoutAdmin />}>
          <Route path="product" element={<ProduitList />} />
          <Route path="commande" element={<Commande />} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
      < Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App  
