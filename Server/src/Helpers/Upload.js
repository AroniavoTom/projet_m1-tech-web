// Helpers/upload.js
const multer = require("multer");

// On utilise la mémoire pour stocker les fichiers en RAM (buffer)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
