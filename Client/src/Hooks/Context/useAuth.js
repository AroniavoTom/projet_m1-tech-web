import { useEffect, useState } from "react";
import { User } from "../../Lib/Utils/InitialData";
const PASSWORDRULES = {
  length: false,
  uppercase: false,
  specialChar: false,
};

//Hooks pour le données user
export function useAuthChange() {
  const [user, setUser] = useState(User);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = user;
  const [passwordRules, setPasswordRules] = useState(PASSWORDRULES);
  const [preview, setPreview] = useState(null); // Ajoute ça en haut

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile" && files && files[0]) {
      const file = files[0];

      // Mettre à jour l'utilisateur avec le fichier image
      setUser((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Générer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 pour l'affichage temporaire
      };
      reader.readAsDataURL(file);
    } else {
      // Pour les champs texte classiques
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const showToggle = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmToggle = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const handleClear=()=>{
    setUser(User);
  }
  // ✅ Faut passer dans  useEffect les variables qui vont déclencher l’effet sinon il ne s’exécutera en boucle infinie
  useEffect(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const specialChar = /[$&"#_@£\-*]/.test(password);
    const match = confirmPassword && password === confirmPassword;

    setPasswordRules({ length, uppercase, specialChar });

    if (confirmPassword && !match) {
      setError("Les mots de passe doivent être identiques !");
      setConfirm(null);
    } else if (confirmPassword && match) {
      setConfirm("Les mots de passe sont identiques !");
      setError(null);
    } else {
      setConfirm(null);
      setError(null);
    }
  }, [password, confirmPassword]);

  return {
    user,
    error,
    confirm,
    handleChange,
    showPassword,
    showToggle,
    passwordRules,
    showConfirmPassword,
    showConfirmToggle,
    preview,
    handleClear
  };
}
