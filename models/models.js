
const mongoose = require("mongoose");

// Modèle idée
const IdeeSchema = new mongoose.Schema({
  id: Number,
    titre: { type: String, required: true },
    description: { type: String, required: true }, 
    commentaires: [{ texte: String}]
});

const schemaUtilisateur = new mongoose.Schema({
    nomUtilisateur: { type: String, required: true, unique: true },
    motDePasse: {type: String, required: true}
});
const Idee = mongoose.model('Idee', schemaIdee);
const Utilisateur = mongoose.model('Utilisateur', schemaUtilisateur);

// Exportation du modèle
module.exports = mongoose.model("idee", IdeeSchema);
