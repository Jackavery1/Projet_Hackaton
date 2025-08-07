
const mongoose = require("mongoose");

// Modèle idée
const IdeeSchema = new mongoose.Schema({
    id: Number,
    titre: { type: String, required: true },
    description: { type: String, required: true }, 
    commentaires: [{ texte: String,
        likes: { type: Number, default: 0 }
}],
    likes: { type: Number, default: 0 }
});

const schemaUtilisateur = new mongoose.Schema({
    nomUtilisateur: { type: String, required: true, unique: true },
    motDePasse: {type: String, required: true}
});
const categorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    }
});
const Idee = mongoose.model('Idee', IdeeSchema);
const Utilisateur = mongoose.model('Utilisateur', schemaUtilisateur);
const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = {
    Idee,
    Utilisateur,
    Categorie
};