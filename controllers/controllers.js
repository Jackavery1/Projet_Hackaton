const bcrypt = require("bcrypt");
const session = require("express-session");
const { Idee, Utilisateur, Categorie } = require("../models/models");
const isAuth = require("../middleware/isAuth");

// #region Rendu des vues EJS
exports.afficherLogin = (req, res) => res.render("pages/login");
exports.afficherSignin = (req, res) => res.render("pages/signin");

exports.afficherIdeaList = async (req, res) => {
  try {
    const ideas = await Idee.find();
    // Ajout de la récupération des catégories
    const categories = await Categorie.find();
    res.render("pages/ideaList", {
      ideas,
      categories, // Passez les catégories à la vue
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
    // Ajout de la récupération des catégories
    const categories = await Categorie.find();
    res.render("pages/ideePage", {
      idea,
      categories, // Passez les catégories à la vue
      utilisateurConnecte: req.session.utilisateur,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};
// #endregion

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

// #region --- Fonctions pour les likes (idées et commentaires) ---

// Fonction pour liker une idée (incrémenter le compteur de likes)

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

// #region Likes

exports.likerIdee = async (req, res) => {
    try {
        // Récupère l'ID de l'idée depuis les paramètres de l'URL.
        const ideeId = req.params.id;

        // Trouve l'idée par son ID et incrémente son champ 'likes' de 1.
        // { new: true } assure que le document mis à jour est renvoyé.
        const idee = await Idee.findByIdAndUpdate(
            ideeId,
            { $inc: { likes: 1 } }, // Opérateur MongoDB pour incrémenter.
            { new: true }
        );
        // Si l'idée n'est pas trouvée, renvoie un statut 404.
        if (!idee) {
            return res.status(404).json({ message: 'J ai pas trouvé l idée désolé.' });
        }
        // Renvoie l'idée mise à jour avec le nouveau nombre de likes, statut 200.
        res.status(200).json(idee);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("ça n a pas liker l idée capitaine:", error);
        res.status(500).json({ message: 'ça chie dans la colle coté serveur.' });
    }
};

// Fonction pour "supprimer un like" d'une idée (décrémenter le compteur de likes)
exports.supprimerLikeIdee = async (req, res) => {
    try {
        const idee = await Idee.findById(req.params.id);
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée." });
        }
        if (idee.likes > 0) {
            const ideeMiseAJour = await Idee.findByIdAndUpdate(
                req.params.id,
                { $inc: { likes: -1 } },
                { new: true }
            );
            return res.status(200).json(ideeMiseAJour);
        } else {
            return res.status(400).json({ message: "Pas de like à supprimer." });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du like :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
  try {
    await Idee.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.redirect("/idee/" + req.params.id);
  } catch (err) {
    res.status(500).send("Erreur like idée");
  }
};

exports.likerCommentaire = async (req, res) => {
    try {
        // Récupère l'ID de l'idée parente et l'ID du commentaire depuis les paramètres de l'URL.
        const ideeId = req.params.ideeId;
        const commentaireId = req.params.commentaireId;

        // Trouve l'idée parente.
        const idee = await Idee.findById(ideeId);
        // Si l'idée n'est pas trouvée, renvoie un statut 404.
        if (!idee) {
            return res.status(404).json({ message: 'Idée non trouvée.' });
        }
        // Trouve le commentaire spécifique dans le tableau 'commentaires' de l'idée par son ID.
        const commentaire = idee.commentaires.id(commentaireId);
        // Si le commentaire n'est pas trouvé, renvoie un statut 404.
        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
        commentaire.likes += 1; // Incrémente le compteur de likes du commentaire.

        await idee.save(); // Sauvegarde l'idée mise à jour (ce qui inclut le commentaire modifié).
        // Renvoie l'idée complète avec le commentaire mis à jour, statut 200.
        res.status(200).json(idee);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Ya un probléme chef avec le like du commentaire :", error);
        res.status(500).json({ message: 'Ya plus de serveur.' });
    }
};

// Fonction pour "supprimer un like" d'un commentaire
exports.supprimerLikeCommentaire = async (req, res) => {
    try {
        const { ideeId, commentaireId } = req.params;
        const idee = await Idee.findById(ideeId);
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée." });
        }
        const commentaire = idee.commentaires.id(commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire non trouvé." });
        }
        if (commentaire.likes > 0) {
            commentaire.likes -= 1;
            await idee.save();
            return res.status(200).json(commentaire);
        } else {
            return res.status(400).json({ message: "Pas de like à supprimer pour ce commentaire." });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du like de commentaire :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};



// #endregion

// #region --- Fonctions CRUD pour les catégories ---

// Créer une nouvelle catégorie
exports.creerCategorie = async (req, res) => {
    try {
        const { nom } = req.body;
        const nouvelleCategorie = new Categorie({ nom });
        await nouvelleCategorie.save();
        res.status(201).json(nouvelleCategorie); // Répondre avec la nouvelle catégorie créée
    } catch (erreur) {
        // En cas d'erreur (nom manquant, doublon, etc.)
        res.status(400).json({ message: erreur.message });
    }
};

// Obtenir toutes les catégories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.status(200).json(categories);
    } catch (erreur) {
        res.status(500).json({ message: "Erreur lors de la récupération des catégories." });
    }
};

// Obtenir une catégorie par son ID
exports.getCategorieById = async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée." });
        }
        res.status(200).json(categorie);
    } catch (erreur) {
        res.status(500).json({ message: "Erreur lors de la récupération de la catégorie." });
    }
};

// Mettre à jour une catégorie par son ID
exports.mettreAJourCategorie = async (req, res) => {
    try {
        const { nom } = req.body;
        const categorie = await Categorie.findByIdAndUpdate(
            req.params.id,
            { nom },
            { new: true, runValidators: true } // Retourne la version mise à jour et valide les données
        );
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée." });
        }
        res.status(200).json(categorie);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
};

// Supprimer une catégorie par son ID
exports.supprimerCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByIdAndDelete(req.params.id);
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée." });
        }
        res.status(200).json({ message: "Catégorie supprimée avec succès." });
    } catch (erreur) {
        res.status(500).json({ message: "Erreur lors de la suppression de la catégorie." });
    }
};

// #endregion
