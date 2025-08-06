const { Idee, Utilisateur } = require("../models/models"); // Importe les modèles Mongoose 'Idee' et 'Utilisateur' pour interagir avec la base de données.

// #region --- Fonctions CRUD (Create, Read, Update, Delete) pour les idées ---

// Fonction pour créer une nouvelle idée
exports.creerIdee = async (req, res) => {
    try {
        // Crée une nouvelle instance du modèle Idee avec les données du corps de la requête (titre, description).
        const nouvelleIdee = new Idee({
            titre: req.body.titre,
            description: req.body.description
        });
        // Sauvegarde la nouvelle idée dans la base de données MongoDB.
        await nouvelleIdee.save();
        // Renvoie l'idée créée avec un statut HTTP 201 (Created) pour indiquer le succès de la création.
        res.status(201).json(nouvelleIdee);
    } catch (error) {
        // En cas d'erreur, log l'erreur dans la console du serveur et renvoie un statut 500 (Internal Server Error).
        console.error("Erreur lors de la création de l'idée :", error);
        res.status(500).json({ message: 'Encore la faute du serveur.' });
    }
};

// Fonction pour lister toutes les idées
exports.listerIdees = async (req, res) => {
    try {
        // Trouve tous les documents dans la collection 'Idee'.
        const idees = await Idee.find();
        // Renvoie le tableau d'idées avec un statut HTTP 200 (OK).
        res.status(200).json(idees);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Erreur lors de la récupération des idées :", error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des idées.' });
    }
};

// Fonction pour supprimer une idée par son ID
exports.supprimerIdee = async (req, res) => {
    try {
        // Trouve et supprime une idée par son ID, passé dans les paramètres de l'URL.
        const idee = await Idee.findByIdAndDelete(req.params.id);
        // Si l'idée n'est pas trouvée, renvoie un statut 404 (Not Found).
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée."});
        }
        // Renvoie un message de succès avec un statut 200.
        res.status(200).json({ message: "Idée supprimée avec succès."});
    } catch(error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Erreur lors de la suppression de l'idée :", error);
        res.status(500).json({ message: "Erreur serveur."})
    }
};

// --- Fonctions pour les commentaires ---

// Fonction pour ajouter un commentaire à une idée spécifique
exports.ajouterCommentaire = async (req, res) => {
    try {
        // Trouve l'idée par son ID.
        const idee = await Idee.findById(req.params.id);
        // Si l'idée n'est pas trouvée, renvoie un statut 404.
        if (!idee) {
            return res.status(404).json({ message: 'Idée non trouvée.' });
        }
        // Ajoute un nouveau commentaire au tableau 'commentaires' de l'idée.
        idee.commentaires.push({ texte: req.body.texte });
        // Sauvegarde l'idée mise à jour.
        await idee.save();
        // Renvoie l'idée complète avec le nouveau commentaire, statut 200.
        res.status(200).json(idee);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).json({ message: 'Serveur HS.' });
    }
};

// Fonction pour supprimer un commentaire spécifique d'une idée
exports.supprimerCommentaire = async (req, res) => {
    try {
        // Trouve l'idée parente par son ID.
        const idee = await Idee.findById(req.params.id);
        // Si l'idée n'est pas trouvée, renvoie un statut 404.
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée." });
        }
        // Récupère l'ID du commentaire à supprimer depuis les paramètres de l'URL.
        const commentaireId = req.params.commentaireId;

        // Stocke la longueur actuelle du tableau de commentaires pour vérifier si un commentaire a été supprimé.
        const commentairesAvantSuppression = idee.commentaires.length;
        // Filtre le tableau de commentaires pour exclure celui dont l'ID correspond.
        idee.commentaires = idee.commentaires.filter(c => c._id.toString() !== commentaireId);

        // Si la longueur du tableau n'a pas changé, le commentaire n'a pas été trouvé.
        if (idee.commentaires.length === commentairesAvantSuppression) {
            return res.status(404).json({ message: "Commentaire non trouvé." });
        }

        // Sauvegarde l'idée avec le commentaire supprimé.
        await idee.save();
        // Renvoie l'idée mise à jour avec un statut 200.
        res.status(200).json(idee);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Erreur lors de la suppression du commentaire :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.supprimerIdee = async (req, res) => {
    try {
        const idee = await Idee.findByIdAndDelete(req.params.id);
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée."});
        }
        res.status(200).json({ message: "Idée supprimée avec succès."});
    } catch(error) {
        console.error("Erreur lors de la suppression de l'idée :", error);
        res.status(500).json({ message: "Erreur serveur."})
    }
};

exports.ajouterLike = async (req, res) => {
  try {
    const idee = await Idee.findById(req.params.id);
    if (!idee) {
      return res.status(404).json({ message: "Idée non trouvée." });
    }
    idee.likes += 1;
    await idee.save();
    res.status(200).json({ message: "Like ajouté.", likes: idee.likes });
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.supprimerLike = async (req, res) => {
    try {
        const idee = await Idee.findById(req.params.id);
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée." });
        }
        if (idee.likes > 0) {
            idee.likes -= 1;
            await idee.save();
            return res.status(200).json({ message: "Like supprimé.", likes: idee.likes });
        } else {
            return res.status(400).json({ message: "Pas de like à supprimer." });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du like :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// --- Fonctions pour les likes (idées et commentaires) ---

// Fonction pour liker une idée (incrémenter le compteur de likes)
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

// Fonction pour "supprimer un like" une idée (décrémenter le compteur de likes)
exports.supprimerLike = async (req, res) => {
    try {
        // Trouve l'idée par son ID.
        const idee = await Idee.findById(req.params.id);
        // Si l'idée n'est pas trouvée, renvoie un statut 404.
        if (!idee) {
            return res.status(404).json({ message: "Idée non trouvée." });
        }
        // Vérifie si l'idée a des likes à supprimer.
        if (idee.likes > 0) {
            idee.likes -= 1; // Décrémente le compteur.
            await idee.save(); // Sauvegarde l'idée mise à jour.
            // Renvoie un message de succès avec le nouveau nombre de likes, statut 200.
            return res.status(200).json({ message: "Like supprimé.", likes: idee.likes });
        } else {
            // Si aucun like à supprimer, renvoie un statut 400 (Bad Request).
            return res.status(400).json({ message: "Pas de like à supprimer." });
        }
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500.
        console.error("Erreur lors de la suppression du like :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour liker un commentaire spécifique
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



// #endregion

// #region Views (Pages HTML)

exports.afficherLogin = (req, res) => {
    res.render("pages/login");
};

exports.afficherSignin = (req, res) => {
    res.render("pages/signin");
};

exports.afficherIdeaList = (req, res) => {
    let ideas = [{ "id": 1, "name": "Patate", "content": "Patate" }, { "id": 2, "name": "Pomme de terre", "content": "Pomme de terre" }];
    res.render("pages/ideaList", { ideas: ideas });
};

exports.afficherIdeaPage = (req, res) => {
    let idea = { "id": 1, "name": "Patate", "content": "Patate", "likes": 13, "comments": [{"id": 1, "name": "Patrick", "content": "C'est bien."}, {"id": 2, "name": "Patrick", "content": "C'est nul."}] };
    res.render("pages/ideaPage", { idea: idea })
}


// --------------------------------------------------------------------------------------------------------------------------



// const bcrypt = require("bcrypt"); // Importe la librairie pour hacher les mots de passe
// const jwt = require("jsonwebtoken"); // Importe la librairie pour créer et vérifier les JSON Web Tokens (JWT)
// const { Idee, Utilisateur } = require("../models/models"); // Importe les modèles de données pour les idées et les utilisateurs

// const JWT_SECRET = process.env.JWT_SECRET; // Récupère la clé secrète pour les JWT depuis votre fichier .env


// // --- Fonctions d'authentification ---

// exports.register = async (req, res) => {
//     // Récupère le nom d'utilisateur et le mot de passe 
//     const { username, password } = req.body;

//     // Vérifie si les champs obligatoires sont présents
//     if (!username || !password) {
//         console.log(" ⚠️ L'enregistrement à foiré il te manque des trucs!");
//         return res.status(400).json({ error: "Nom et mot de passe requis" });
//     }

//     try {
//         // Cherche si un utilisateur avec ce nom existe déjà dans la base de données
//         const existing = await Utilisateur.findOne({ nomUtilisateur: username });
//         if (existing) {
//             console.log(" ⚠️ L'enregistrement à encore foiré, le nom existe déjà");
//             return res.status(409).json({ error: "Nom déjà existant." }); // Retourne une erreur 409 (Conflit)
//         }

//         // Hache le mot de passe fourni par l'utilisateur pour le sécuriser.
//         // Le chiffre '10' est le "salt rounds", un niveau de sécurité par défaut.
//         const hash = await bcrypt.hash(password, 10);

//         // Crée un nouvel objet utilisateur avec le nom d'utilisateur et le mot de passe haché
//         const user = new Utilisateur({ nomUtilisateur: username, motDePasse: hash });

//         // Sauvegarde le nouvel utilisateur dans la base de données MongoDB
//         await user.save();

//         // Si tout s'est bien passé, renvoie une réponse de succès (statut 201 Créé)
//         res.status(201).json({ message: "Tu as bien été enregistré." });
//     } catch (error) {
//         // En cas d'erreur pendant l'opération, log l'erreur et renvoie un statut 500
//         console.error("Erreur lors de l'inscription :", error);
//         return res.status(500).json({ error: "Oups erreur sur le serveur." });
//     }
// };

// exports.login = async (req, res) => {
//     // Récupère le nom d'utilisateur et le mot de passe du corps de la requête
//     const { username, password } = req.body;

//     console.log("Tentavive de connexion de:", username);

//     // Vérifie si les informations de connexion sont complètes
//     if (!username || !password) {
//         return res.status(400).json({ error: "Nom et mot de passe requis sinon tu rentre pas!" });
//     }

//     try {
//         // Cherche l'utilisateur dans la base de données
//         const user = await Utilisateur.findOne({ nomUtilisateur: username });
//         if (!user) { // Si aucun utilisateur n'est trouvé
//             console.log(" ⚠️ Je ne t ais pas trouvé, désolé!");
//             return res.status(401).json({ error: "Invalid credentials" }); // Statut 401 (Non autorisé)
//         }

//         // Compare le mot de passe fourni avec le mot de passe haché stocké
//         const match = await bcrypt.compare(password, user.motDePasse);
//         if (!match) { // Si les mots de passe ne correspondent pas
//             console.log(" ⚠️ Login failed: Password mismatch");
//             return res.status(401).json({ error: "Mauvais identifiant" }); // Statut 401 (Non autorisé)
//         }

//         console.log(" ✅ Tu es accepté:", username);

//         // Crée un token JWT qui contient l'ID et le nom d'utilisateur.
//         // Ce token sera utilisé pour les requêtes futures pour prouver l'identité de l'utilisateur.
//         const token = jwt.sign({ id: user._id, username: user.nomUtilisateur }, JWT_SECRET, { expiresIn: "1h" });

//         // Renvoie le token à l'utilisateur dans la réponse JSON
//         res.json({ token });
//     } catch (error) {
//         // En cas d'erreur lors de la connexion, log et renvoie un statut 500
//         console.error("Erreur lors de la connexion :", error);
//         return res.status(500).json({ error: "Le serveur à pris feu par ta faute!" });
//     }
// };

// exports.me = (req, res) => {
//     // Cette fonction est censée retourner les informations de l'utilisateur qui a fait la requête.
//     // Cela nécessite qu'un "middleware" (une fonction intermédiaire) ait déjà décodé le token JWT
//     // et ait placé les informations de l'utilisateur dans l'objet 'req.user'.
//     if (!req.user) {
//         return res.status(401).json({ error: "T es qui?" });
//     }
//     res.json({ user: req.user });
// };

// // --- Fonctions existantes pour les idées et commentaires (inchangées) ---

// exports.creerIdee = async (req, res) => {
//     try {
//         const nouvelleIdee = new Idee({ titre: req.body.titre, description: req.body.description });
//         await nouvelleIdee.save();
//         res.status(201).json(nouvelleIdee);
//     } catch (error) {
//         console.error("Erreur lors de la création de l'idée :", error);
//         res.status(500).json({ message: 'Erreur serveur oups.' });
//     }
// };

// exports.ajouterCommentaire = async (req, res) => {
//     try {
//         const idee = await Idee.findById(req.params.id);
//         if (!idee) {
//             return res.status(404).json({ message: 'Idée non trouvée.' });
//         }
//         idee.commentaires.push({ texte: req.body.texte });
//         await idee.save();
//         res.status(200).json(idee);
//     } catch (error) {
//         console.error("J'ai pas envie d'ajouter le commentaire :", error);
//         res.status(500).json({ message: 'La faute au serveur.' });
//     }
// };

// exports.listerIdees = async (req, res) => {
//     try {
//         const idees = await Idee.find();
//         res.status(200).json(idees);
//     } catch (error) {
//         console.error("Je peux pas recupérer les idées :", error);
//         res.status(500).json({ message: 'Serveur pourris.' });
//     }
// };
