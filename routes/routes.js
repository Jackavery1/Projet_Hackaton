const express = require("express");
const router = express.Router();
const controleursIdees = require("../controllers/controllers.js");
const accueilController = require("../controllers/controllers.js");

// Route POST pour créer une idée
router.post("/api/idees", controleursIdees.creerIdee);

//Route POST pour ajouter un commentaire à une idée
router.post("/api/idees/:id/commentaire", controleursIdees.ajouterCommentaire);

//Route GET pour affichage index.ejs
router.get("/", accueilController.afficherAccueil);

module.exports = router;

// ------------------------------------------------------------------------------

// // Routes d'authentification
// router.post("/api/register", controleurs.register); // Route pour l'inscription
// router.post("/api/login", controleurs.login);     // Route pour la connexion
// router.get("/api/me", controleurs.me);           // Route pour récupérer les infos de l'utilisateur (sans middleware d'auth pour l'instant)
