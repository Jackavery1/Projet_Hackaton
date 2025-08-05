require("dotenv").config();
const mongoose = require("mongoose");

//Connexion à MongoDB + Atlas
const connecterBaseDeDonnees = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // va chercher URI dans .env
    console.log("Connecté à MongoDB avec succès !");
  } catch (erreur) {
    console.error("Erreur de connexion à MongoDB :", erreur);
  }
};

module.exports = connecterBaseDeDonnees;
