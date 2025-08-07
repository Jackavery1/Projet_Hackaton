const express = require("express");
const router = express.Router();
const controleurs = require("../controllers/controllers");
const isAuth = require("../middleware/isAuth");

// Routes login/inscription
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
router.post("/api/login", controleurs.login);

router.get("/signin", controleurs.afficherSignin);
router.post("/api/register", controleurs.register);

// Routes  Idées
router.get("/listeidee", isAuth, controleurs.afficherIdeaList);
router.get("/idee/:id", isAuth, controleurs.afficherIdeaPage);

router.post("/api/idees", isAuth, controleurs.creerIdee);
router.get("/api/idees", isAuth, controleurs.listerIdees);
router.delete("/api/idees/:id", isAuth, controleurs.supprimerIdee);

// Routes Commentaires
router.post(
  "/api/idees/:id/commentaire",
  isAuth,
  controleurs.ajouterCommentaire
);
router.delete(
  "/api/idees/:id/commentaires/:commentaireId",
  isAuth,
  controleurs.supprimerCommentaire
);

// Routes Likes
router.post("/api/idees/:id/like", isAuth, controleurs.likerIdee);
router.post("/api/idees/:id/deletelike", isAuth, controleurs.supprimerLike);
router.post(
  "/api/idees/:ideeId/commentaires/:commentaireId/like",
  isAuth,
  controleurs.likerCommentaire
);

//Déco
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
router.get("/listeidee", controleurs.afficherIdeaList);
router.get("/idee/:id", controleurs.afficherIdeaPage);

// --- Routes pour les catégories ----
router.post('/api/categories', controleurs.creerCategorie);
router.get('/api/categories', controleurs.getCategories);
router.get('/api/categories/:id', controleurs.getCategorieById);
router.put('/api/categories/:id', controleurs.mettreAJourCategorie);
router.delete('/api/categories/:id', controleurs.supprimerCategorie);

module.exports = router;
