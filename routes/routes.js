const express = require('express');
const router = express.Router();
const controleurs = require('../controllers/controllers.js'); // Importe TOUTES les fonctions du contrôleur sous un seul nom

// --- Routes pour les idées ---
router.post('/api/idees', controleurs.creerIdee);
router.get('/api/idees', controleurs.listerIdees);
router.delete('/api/idees/:id', controleurs.supprimerIdee);

// --- Routes pour les commentaires ---
router.post('/api/idees/:id/commentaire', controleurs.ajouterCommentaire);
router.delete('/api/idees/:id/commentaires/:commentaireId', controleurs.supprimerCommentaire);

// --- Routes pour les likes ---
router.post('/api/idees/:id/like', controleurs.likerIdee); // Liker une idée
router.post('/api/idees/:id/deletelike', controleurs.supprimerLikeIdee); // Supprimer un like d'une idée
router.post('/api/idees/:ideeId/commentaires/:commentaireId/like', controleurs.likerCommentaire); // Liker un commentaire
router.post('/api/idees/:ideeId/commentaires/:commentaireId/deletelike', controleurs.supprimerLikeCommentaire); // Supprimer un like d'un commentaire

// --- Routes pour les vues (si vous utilisez EJS) ---
router.get("/", controleurs.afficherLogin);
router.get("/signin", controleurs.afficherSignin);
router.get("/listeidee", controleurs.afficherIdeaList);
router.get("/idee/:id", controleurs.afficherIdeaPage);

// --- Routes pour les catégories ----
router.post('/api/categories', controleurs.creerCategorie);
router.get('/api/categories', controleurs.getCategories);
router.get('/api/categories/:id', controleurs.getCategorieById);
router.put('/api/categories/:id', controleurs.mettreAJourCategorie);
router.delete('/api/categories/:id', controleurs.supprimerCategorie);

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

