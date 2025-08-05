const mongoose = require("mongoose");
const //nom du modèle// = require("../models/models");
const data = require("./db.json");

// Connexion à MongoDB
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Projet_Hackathon", {});
    console.log("Connexion réussie à MongoDB");
    // Supp les doublons et ajoute les nouvelles
    await //nom du modèle//.deleteMany({});
    await //nom du modèle//.insertMany(data);
    console.log("Données ajoutées à la bd");
  } catch (err) {
    console.error("Erreur de connexion à la bd :", err);
    throw err;
  }
};
