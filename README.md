# Boîte à Idées Inclusives

## Description

Cette application permet à tout le monde de déposer, consulter et voter pour des idées afin de favoriser l'inclusion dans notre communauté.

L’objectif est de recueillir des suggestions diverses dans un environnement accessible, simple d'utilisation et convivial.

### 🎯 Accessibilité

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

- **Déploiement :**  

  L’application est exécutée **en local** pour le moment. Le code source est disponible sur [GitHub](https://github.com/ton-utilisateur/ton-projet).

---

## Fonctionnalités principales

- 💡 Soumission d’idées via un formulaire simple et intuitif  
- 📋 Consultation de la liste des idées soumises  
- ❤️ Vote (like) sur les idées préférées    
- ♿ Interface accessible pour tous les profils d’utilisateurs  

---

## Installation & déploiement

### Prérequis

- [Node.js](https://nodejs.org/) installé  
- [Git](https://git-scm.com/) installé  
- Accès à une base de données MongoDB (exemple : [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Étapes

1. **Cloner le dépôt depuis GitHub**  
```bash
    git clone https://github.com/ton-utilisateur/ton-projet.git
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
    npm start
```
6. **Ouvrir votre navigateur à l’adresse :**
```bash
    http://localhost:3000
```
## Contribution

Les contributions sont les bienvenues !
Si vous souhaitez participer :

  1. Forkez ce dépôt

  2. Créez une branche dédiée (git checkout -b feature-nouvelle-fonctionnalité)

  3. Commitez vos modifications (git commit -m 'Ajout d'une nouvelle fonctionnalité')

  4. Poussez votre branche (git push origin feature-nouvelle-fonctionnalité)

  5. Ouvrez une Pull Request

## Contact

Pour toute question, suggestion ou retour d’expérience, vous pouvez me contacter à : [jorisdavid.martinez@gmail.com](mailto:jorisdavid.martinez@gmail.com)

## Licence

Ce projet utilise la licence **ISC** telle que déclarée dans le fichier `package.json`.

Le texte complet de la licence pourra être ajouté ultérieurement dans un fichier dédié.
README.md
4 Ko