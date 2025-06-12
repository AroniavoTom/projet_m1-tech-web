
const cloudinary = require("../Helpers/Cloudinary");
const GenerateToken = require("../Helpers/GenerateToken");
const User = require("../Models/User");
const bcryptJs = require("bcryptjs");


//S'inscrire dans le chat app
exports.addUser = async (req, res) => {
    console.log("Les données reçues dans req.body :", req.body);
    const { username, email, password } = req.body;
    const { profile } = req.file;
    //Vérification des champs requis
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    try {
        //Vérification des caractères d'un mot de passe 
        if (password.length < 10) {
            return res.status(400).json({ message: "Le mot de passe doit composer au moins 8 caractères !" });
        }
        //Vérification si l'admin existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email existe déjà!" })
        }
        //Mettre le mot de passe à crypter 
        const salt = await bcryptJs.genSalt(10);
        const hashedPassword = await bcryptJs.hash(password, salt);

        //Envoyer la profile dans Cloundinary
        //Vérifier si l'image existe
        let profileUrl;

        if (profile) {
            try {
                if (file) {
                    // Téléverser avec upload_stream
                    const result = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            {
                                folder: "profiles", // facultatif
                                resource_type: "image"
                            },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result);
                            }
                        );

                        stream.end(file.buffer);
                    });

                    profileUrl = result.secure_url;
                }
            } catch (uploadError) {

                return res.status(400).json({ message: "Erreur lors du téléversement de l'image", error: uploadError.message });
            }

        }

        //Inforamation de nouveau utilisateur qu'on va envoyer dans la base de données 
        const newUser = new User({
            username,
            email,
            profile: profileUrl ? profileUrl : "" ,
            password: hashedPassword,
        })
        if (newUser) {
            const saveUser = await newUser.save();
            res.status(201).json({ message: "Utilisateur créé avec succès !", user: saveUser })
        } else {
            return res.status(400).json({ message: "Requête invalide !" })
        }
    } catch (error) {
        console.log("Erreur lors du tentative d'ajout !", error.message)
        res.status(500).json({ message: "Erreur lors du tentartive d'ajout  " })
    }
};
//S'authentifier dans l'app
exports.loginUser = async (req, res) => {
    console.log("Données reçues dans req.body :", req.body);

    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({ message: "Utilisateur n'existe pas encore !" })
        }
        //Vérification de mot de passe si correct 
        const isPasswordCorrect = await bcryptJs.compare(password, userExist.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Mot de passe incorrect !" })
        }
        GenerateToken.generateToken(userExist._id, res);

        res.status(200).json({ message: "Connexion réussi " })

    } catch (error) {
        console.log("Erreur lors du tentative d'authentifier !", error.message)
        res.status(500).json({ message: "Erreur lors du tentartive d'authentifier " })
    }

};
//Quitter l'app
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Déconnexion réussi !" });
    } catch (error) {
        console.log("Erreur lors du tentative de quitter le chat!", error.message)
        res.status(500).json({ message: "Erreur lors du tentartive de quitter le chat  " })
    }
}

//Modifier le profile
exports.updateUser = async (req, res) => {
    console.log("Données reçues dans req.body :", req.body);
    const { username, email, profile, password } = req.body

};
// Récupérer l'utilisateur connecté via les cookies
exports.getLoggedInUser = async (req, res) => {
    try {
        // Récupérer le token depuis les cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Non autorisé - Aucun token fourni" });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ message: "Non autorisé - Token invalide" });
        }

        // Récupérer l'utilisateur depuis la base de données (sans le mot de passe)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Erreur lors de la récupération de l'utilisateur:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Non autorisé - Token invalide" });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Non autorisé - Token expiré" });
        }

        res.status(500).json({ message: "Erreur serveur" });
    }
};