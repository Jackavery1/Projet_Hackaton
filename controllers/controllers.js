const bcrypt = require("bcrypt");
const session = require("express-session");
const { Utilisateur, Idee } = require("../models/models");
const isAuth = require("../middleware/isAuth");

// Rendu des vues EJS
exports.afficherLogin = (req, res) => res.render("pages/login");
exports.afficherSignin = (req, res) => res.render("pages/signin");

exports.afficherIdeaList = async (req, res) => {
  try {
    const ideas = await Idee.find();
    res.render("pages/ideaList", {
      ideas,
      utilisateurConnecte: req.session.utilisateur,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

exports.afficherIdeaPage = async (req, res) => {
  try {
    const idea = await Idee.findById(req.params.id);
    if (!idea) return res.status(404).send("Idée non trouvée");
    res.render("pages/ideePage", {
      idea,
      utilisateurConnecte: req.session.utilisateur,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// Authentification
exports.register = async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  try {
    const hash = await bcrypt.hash(motDePasse, 10);
    const nouvelUtilisateur = new Utilisateur({
      nomUtilisateur,
      motDePasse: hash,
    });
    await nouvelUtilisateur.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Erreur lors de l’inscription");
  }
};

exports.login = async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  try {
    const utilisateur = await Utilisateur.findOne({ nomUtilisateur });
    if (!utilisateur) return res.redirect("/");

    const match = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!match) return res.redirect("/");
    req.session.utilisateur = utilisateur;
    res.redirect("/listeidee");
  } catch (err) {
    res.status(500).send("Erreur lors de la connexion");
  }
};

// CRUD Idées
exports.creerIdee = async (req, res) => {
  const { titre, description, category } = req.body;
  try {
    const nouvelleIdee = new Idee({
      titre,
      description,
      commentaires: [],
      likes: 0,
    });
    await nouvelleIdee.save();
    res.redirect("/listeidee");
  } catch (err) {
    res.status(500).send("Erreur lors de la création");
  }
};

exports.listerIdees = async (req, res) => {
  try {
    const ideas = await Idee.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

exports.supprimerIdee = async (req, res) => {
  try {
    await Idee.findByIdAndDelete(req.params.id);
    res.redirect("/listeidee");
  } catch (err) {
    res.status(500).send("Erreur suppression");
  }
};

// Commentaires
exports.ajouterCommentaire = async (req, res) => {
  const { texte } = req.body;
  try {
    const idee = await Idee.findById(req.params.id);
    if (!idee) return res.status(404).send("Idée non trouvée");

    idee.commentaires.push({ texte, likes: 0 });
    await idee.save();

    res.redirect("/idee/" + req.params.id);
  } catch (err) {
    res.status(500).send("Erreur ajout commentaire");
  }
};

exports.supprimerCommentaire = async (req, res) => {
  const { id, commentaireId } = req.params;
  try {
    const idee = await Idee.findById(id);
    if (!idee) return res.status(404).send("Idée non trouvée");

    idee.commentaires.splice(commentaireId, 1);
    await idee.save();

    res.redirect("/idee/" + id);
  } catch (err) {
    res.status(500).send("Erreur suppression commentaire");
  }
};

// Likes
exports.likerIdee = async (req, res) => {
  try {
    await Idee.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.redirect("/idee/" + req.params.id);
  } catch (err) {
    res.status(500).send("Erreur like idée");
  }
};

exports.supprimerLike = async (req, res) => {
  try {
    await Idee.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } });
    res.redirect("/idee/" + req.params.id);
  } catch (err) {
    res.status(500).send("Erreur unlike idée");
  }
};

exports.likerCommentaire = async (req, res) => {
  const { ideeId, commentaireId } = req.params;
  try {
    const idee = await Idee.findById(ideeId);
    if (!idee) return res.status(404).send("Idée non trouvée");

    const commentaire = idee.commentaires[commentaireId];
    if (commentaire) commentaire.likes++;

    await idee.save();
    res.redirect("/idee/" + ideeId);
  } catch (err) {
    res.status(500).send("Erreur like commentaire");
  }
};
