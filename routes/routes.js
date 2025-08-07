const express = require("express");
const router = express.Router();
const controleurs = require("../controllers/controllers");
const isAuth = require("../middleware/isAuth");

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
router.post("/api/idees/:id/deletelike", isAuth, controleurs.supprimerLikeIdee);
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
