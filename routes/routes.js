const express = require('express');
const router = express.Router();
const controleurs = require('../controllers/controllers.js'); // Importe TOUTES les fonctions du contrôleur sous un seul nom

// --- Routes pour les idées ---
router.post('/api/idees', controleurs.creerIdee);
router.get('/api/idees', controleurs.listerIdees); // Ajout de la route pour lister les idées
router.delete('/api/idees/:id', controleurs.supprimerIdee); // Supprimer une idée

// --- Routes pour les commentaires ---
router.post('/api/idees/:id/commentaire', controleurs.ajouterCommentaire);
// Correction : utilise :commentaireId pour correspondre au contrôleur
router.delete('/api/idees/:id/commentaires/:commentaireId', controleurs.supprimerCommentaire); // Supprimer un commentaire

// --- Routes pour les likes ---
router.post('/api/idees/:id/like', controleurs.likerIdee); // Liker une idée
// Correction : utilise POST pour 'unlike' pour correspondre au comportement du contrôleur (décrémenter)
router.post('/api/idees/:id/deletelike', controleurs.supprimerLike); // Décrémenter les likes d'une idée
router.post('/api/idees/:ideeId/commentaires/:commentaireId/like', controleurs.likerCommentaire); // Liker un commentaire

// --- Routes pour les vues (si vous utilisez EJS) ---
// Utilise 'controleurs' pour toutes les fonctions de vue pour la cohérence
router.get("/", controleurs.afficherLogin);
router.get("/signin", controleurs.afficherSignin);
router.get("/listeidee", controleurs.afficherIdeaList);
router.get("/idee/:id", controleurs.afficherIdeaPage);

module.exports = router;

// ------------------------------------------------------------------------------

// const express = require("express");
// const router = express.Router();
// const controleurs = require("../controllers/controllers.js"); // Utilise le nom de votre fichier de contrôleurs

// // Routes d'authentification
// router.post("/api/register", controleurs.register); // Route pour l'inscription
// router.post("/api/login", controleurs.login);     // Route pour la connexion
// router.get("/api/me", controleurs.me);           // Route pour récupérer les infos de l'utilisateur (sans middleware d'auth pour l'instant)


// router.post('/api/idees', controleurs.creerIdee);
// router.post('/api/idees/:id/commentaire', controleurs.ajouterCommentaire);
// router.get('/api/idees', controleurs.listerIdees);

// module.exports = router;

