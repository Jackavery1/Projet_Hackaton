const express = require("express");
const router = express.Router();
const controleurs = require("../controllers/controllers");
const isAuth = require("../middleware/isAuth");

// Routes login/inscription
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

module.exports = router;
