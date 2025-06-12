const Produit = require("../Models/Produit");
const cloudinary = require("../Helpers/Cloudinary");

// Utilitaire pour uploader un fichier buffer avec Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        stream.end(fileBuffer);
    });
};

// Ajouter un produit (optimisé)
exports.addProduit = async (req, res) => {
    try {
        const { marque, nom, prix } = req.body;
       

        // 🔧 Création du filesMap
        const filesMap = {};
        (req.files || []).forEach(file => {
            if (!filesMap[file.fieldname]) filesMap[file.fieldname] = [];
            filesMap[file.fieldname].push(file);
        });

        // 🔄 Parsing description et autreColor
        let description, autreColorData;

        try {
            description = typeof req.body.description === 'string'
                ? JSON.parse(req.body.description)
                : req.body.description;

            autreColorData = typeof req.body.autreColor === 'string'
                ? JSON.parse(req.body.autreColor)
                : req.body.autreColor;
        } catch (err) {
            return res.status(400).json({ message: "Données JSON invalides (description ou autreColor)" });
        }

        // ✅ Validation des champs requis
        if (!marque || !nom || !description?.generale || !filesMap["image"]) {
            return res.status(400).json({ message: "Champs requis manquants : marque, nom, image, ou description.generale" });
        }

        if (description.specification && !Array.isArray(description.specification)) {
            return res.status(400).json({ message: "description.specification doit être un tableau" });
        }

        if (!Array.isArray(autreColorData)) {
            return res.status(400).json({ message: "autreColor doit être un tableau" });
        }

        // 📤 Upload image principale
        const imageUpload = uploadToCloudinary(filesMap["image"][0].buffer);

        // 📤 Uploads en parallèle pour autreColor
        const autreColorUploads = autreColorData.map(async (item, i) => {
            const fileKey = `autreColor[${i}][image]`;
            const file = filesMap[fileKey]?.[0];
            if (!file || !item.color) {
                throw new Error(`Image ou couleur manquante pour autreColor[${i}]`);
            }

            const uploadResult = await uploadToCloudinary(file.buffer);
            return { image: uploadResult.secure_url, color: item.color };
        });

        // 🕓 Attendre tous les uploads
        const [imageResult, autreColorUploaded] = await Promise.all([
            imageUpload,
            Promise.all(autreColorUploads)
        ]);

        // 💾 Sauvegarde du produit
        const newProduit = new Produit({
            image: imageResult.secure_url,
            marque,
            nom,
            prix,
            description,
            autreColor: autreColorUploaded
        });

        await newProduit.save();
        res.status(201).json({ message: "Produit ajouté avec succès", produit: newProduit });

    } catch (error) {
        console.error("Erreur dans addProduit:", error);
        res.status(500).json({
            message: error.message.includes("autreColor") ? error.message : "Erreur serveur lors de l'ajout du produit",
            error: error.message
        });
    }
};


//Obtenir tous les produits
exports.getAllProduits = async (req, res) => {
    try {
        const data = await Produit.find();
        res.status(200).json({ message: "Produits récupérés avec succès", data });
    } catch (error) {
        console.error("Erreur dans getAllProduits:", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des produits", error: error.message });
    }

};

//Obtenir un produit par ID
exports.getOneProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Produit.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json({ message: "Produit récupéré avec succès", data });
    } catch (error) {
        console.error("Erreur dans getOneProduit:", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération du produit", error: error.message });
    }
};
exports.deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const produit = await Produit.findByIdAndDelete(id);
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        console.error("Erreur dans deleteProduit:", error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression du produit", error: error.message });
    }
}