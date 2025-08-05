const mongoose = require("mongoose");

// Modèle idée
const IdeeSchema = new mongoose.Schema({
  id: Number,
  titre: reqire true, String,
  definition: String,
  //categorie: String,
  like: {default null, true/false,}
  commentaire: default 0, string 
});

// Exportation du modèle
module.exports = mongoose.model("idee", IdeeSchema);
