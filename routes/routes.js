
const express = require('express');
const router = express.Router(); 
const controleursIdees = require('../controllers/controllers.js'); 

router.get("/", controleursIdees.afficherAccueil);
router.post('/api/idees', controleursIdees.creerIdee);
router.post('/api/idees/:id/commentaire', controleursIdees.ajouterCommentaire);


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

