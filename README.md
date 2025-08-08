# Boîte à Idées Inclusives

## Description

Cette application permet à tout le monde de déposer, consulter et voter pour des idées afin de favoriser l'inclusion dans notre communauté.

L’objectif est de recueillir des suggestions diverses dans un environnement accessible, simple d'utilisation et convivial.

### Accessibilité

L’accessibilité est au cœur du projet. L’application a été conçue pour être utilisable par toutes et tous, y compris les personnes en situation de handicap. 

Elle respecte plusieurs bonnes pratiques des [normes WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) (niveau AA), notamment :

- Navigation au clavier
- Contrastes suffisants
- Hiérarchie claire des titres
- Formulaires lisibles avec labels
- Textes lisibles et structurés

---

## Technologies utilisées

- **Frontend :**

  Utilisation des templates EJS (Embedded JavaScript) pour générer les pages HTML dynamiquement côté serveur. Cela permet une interface légère, sans framework frontend complexe.

- **Backend :**

  API REST construite avec Node.js et Express, qui gère les idées, les utilisateurs, et les votes.

- **Base de données :**

  MongoDB, utilisée pour stocker les idées et les utilisateurs.

- **Authentification :**

  Hash du mot de passe via bcrypt et sécurisation des routes.

- **Déploiement :**

  L’application est exécutée **en local** pour le moment. Le code source est disponible sur [GitHub](https://github.com/Jackavery1/Projet_Hackaton).

---

## Fonctionnalités principales

- Soumission d’idées via un formulaire simple et intuitif
- Consultation de la liste des idées soumises
- Vote (like) sur les idées préférées
- Interface accessible pour tous les profils d’utilisateurs

---

## Installation & déploiement

### Prérequis

- [Node.js](https://nodejs.org/) installé
- [Git](https://git-scm.com/) installé
- Accès à une base de données MongoDB (exemple : [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Étapes

1. **Cloner le dépôt depuis GitHub**

```bash
    git clone https://github.com/Jackavery1/Projet_Hackaton.git
```

2. **Aller dans le dossier du projet**

```bash
    cd ton-projet
```

3. **Installer les dépendances :**

```bash
    npm install
```

4. **Configurer les variables d’environnement en créant un fichier .env à la racine du projet et y ajouter :**

```bash
    DB_URL=ton_url_de_bdd
    PORT=3000
```

5. **Lancer l’application en local :**

```bash
    npm run dev
```

6. **Ouvrir votre navigateur à l’adresse :**

```bash
    http://localhost:3000
```

---

## Routes de l'API

- **Routes login/inscription**

      router.get("/", controleurs.afficherLogin);
      router.post("/api/login", controleurs.login);

      router.get("/signin", controleurs.afficherSignin);
      router.post("/api/register", controleurs.register);

- **Routes  Idées**

      router.get("/listeidee", isAuth, controleurs.afficherIdeaList);
      router.get("/idee/:id", isAuth, controleurs.afficherIdeaPage);

      router.post("/api/idees", isAuth, controleurs.creerIdee);
      router.get("/api/idees", isAuth, controleurs.listerIdees);
      router.post("/api/idees/:id", isAuth, controleurs.supprimerIdee);

- **Routes Commentaires**

      router.post("/api/idees/:id/commentaire",isAuth,controleurs.ajouterCommentaire);
      router.post("/api/idees/:id/commentaires/:commentaireId",isAuth,controleurs.supprimerCommentaire);

- **Routes Likes**

      router.post("/api/idees/:id/like", isAuth, controleurs.likerIdee);
      router.post("/api/idees/:id/deletelike", isAuth, controleurs.supprimerLike);
      router.post("/api/idees/:ideeId/commentaires/:commentaireId/like",isAuth,controleurs.likerCommentaire);

- **Déco**

      router.post("/logout", (req, res) => {req.session.destroy(() => {res.redirect("/"););

## Contribution

Les contributions sont les bienvenues !
Si vous souhaitez participer :

1. Forkez ce dépôt

2. Créez une branche dédiée (git checkout -b feature-nouvelle-fonctionnalité)

3. Commitez vos modifications (git commit -m "Ajout d'une nouvelle fonctionnalité")

4. Poussez votre branche (git push origin feature-nouvelle-fonctionnalité)

5. Ouvrez une Pull Request

## Contact

Pour toute question, suggestion ou retour d’expérience, vous pouvez me contacter à : [jorisdavid.martinez@gmail.com](mailto:jorisdavid.martinez@gmail.com)

## Licence

Ce projet utilise la licence **ISC** telle que déclarée dans le fichier `package.json`.

Le texte complet de la licence pourra être ajouté ultérieurement dans un fichier dédié.
