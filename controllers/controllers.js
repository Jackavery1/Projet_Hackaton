
const { Idee } = require('../models/models'); 

exports.creerIdee = async (req, res) => {
    try {
        const nouvelleIdee = new Idee({
            titre: req.body.titre,
            description: req.body.description
        });
        await nouvelleIdee.save(); 
        res.status(201).json(nouvelleIdee); 
    } catch (error) {
        console.error("Erreur lors de la création de l'idée :", error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
exports.ajouterCommentaire = async (req, res) => {
    try {
        const idee = await Idee.findById(req.params.id);
        if (!idee) {
            return res.status(404).json({ message: 'Idée non trouvée.' });
        }
        idee.commentaires.push({ texte: req.body.texte });
        await idee.save();
        res.status(200).json(idee);
    } catch (error) { 
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.afficherAccueil = (req, res) => res.render("accueil")
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
