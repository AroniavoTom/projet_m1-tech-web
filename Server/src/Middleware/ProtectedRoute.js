const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dotenv = require("dotenv");

//Charger les variables d'environnement depuis le fichier .env 
dotenv.config();

exports.protectedRoute = async (req, res, next) => {
    try {
        let token = null;

        if (req.cookies?.jwt) {
            token = req.cookies.jwt;
        } else if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Non autorisé, token n'existe pas ou n'est pas correct! " })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        if (!decoded) {
            return res.status(401).json({ message: "Non autorisé, token n'est pas validé! " })
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur n'existe pas !" })
        }

        req.user = user;
        next();

        console.log(jwt); // Vérifiez si jwt est bien défini

    } catch (error) {
        console.log("Erreur interne du serveur!", error.message)
        res.status(500).json({ message: "Erreur interne du serveur !" })
    }
}