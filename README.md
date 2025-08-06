# Projet Hackathon

-----------------------------------------------------------------
Config .env

PORT = PORT
MONGODB_URI = URL MongoDB

-----------------------------------------------------------------
Client : Ejs Tailwind
```

```

-----------------------------------------------------------------
Server : NodeJS Express
Base de données : MongoDB 
```

```

-----------------------------------------------------------------

Pour les routes POST avec ThunderClient:

Pour ajouter une idée
Selectionez POST dans le menu déroulant à gauche de l'URL
Puis dans l'URL mettre (http://localhost:3000/api/idees)
Puis allez dans Body, selectionnez le type JSON et collez une idée
{
  "titre": "L'idée la plus absurde du monde",
  "description": "Créer un service de livraison de chaussettes dépareillées à domicile, pour ceux qui aiment le frisson de l'inconnu chaque matin."
}
Cliquez sur send, le resultat attendu:
{
  "titre": "L'idée la plus absurde du monde",
  "description": "Créer un service de livraison de chaussettes dépareillées à domicile, pour ceux qui aiment le frisson de l'inconnu chaque matin.",
  "likes": 0,
  "_id": "6892fb756f7ba7a6907919e6",
  "commentaires": [],
  "__v": 0
}

Pour ajouter un commentaire
Selectionnez POST dans le menu déroulant à gauche de l'URL
Puis dans l'URL mettre (http://localhost:3000/api/idees/6892fb756f7ba7a6907919e6/commentaire)
                        (     adresse normal           / id de l'idée          / commentaire) 
Puis allez dans Body, selectionnez le type JSON et collez un commentaire
{
  "texte": "Ceci est un commentaire génial pour cette idée !"
}
Cliquez sur send, le resulat attendu:
{
  "_id": "6892fb756f7ba7a6907919e6",
  "titre": "L'idée la plus absurde du monde",
  "description": "Créer un service de livraison de chaussettes dépareillées à domicile, pour ceux qui aiment le frisson de l'inconnu chaque matin.",
  "likes": 0,
  "commentaires": [
    {
      "texte": "Ceci est un commentaire génial pour cette idée !",
      "likes": 0,
      "_id": "6893025b6f7ba7a6907919e9"
    }
  ],
  "__v": 1
}

Pour like une idée
Selectionnez POST dans le menu déroulant à gauche de l'URL
Puis dans l 'URL mettre (http://localhost:3000/api/idees/6892fb756f7ba7a6907919e6/like)
                        (adresse normal               /  id de l 'idée           /like)
Ne rien mettre dans le body
Cliquez sur send, le resultat attendu:
{
  "_id": "6892fb756f7ba7a6907919e6",
  "titre": "L'idée la plus absurde du monde",
  "description": "Créer un service de livraison de chaussettes dépareillées à domicile, pour ceux qui aiment le frisson de l'inconnu chaque matin.",
  "likes": 1,  <======= ajout d'un like sur une idée✅
  "commentaires": [
    {
      "texte": "Ceci est un commentaire génial pour cette idée !",
      "likes": 0,
      "_id": "6893025b6f7ba7a6907919e9"
    }
  ],
  "__v": 1
}

Pour like un commentaire
Selectionnez POST dans le menu déroulant à gauche de l'URL
Puis dans l'URL mettre (http://localhost:3000/api/idees/6892fb756f7ba7a6907919e6/commentaires/6893025b6f7ba7a6907919e9/like)
                       ( adresse normal                / id de l'idée           /commentaire / id du commentaire     / like)
Ne rien mettre dans le body
Cliquez sur send, le resultat attendu:
{
  "_id": "6892fb756f7ba7a6907919e6",
  "titre": "L'idée la plus absurde du monde",
  "description": "Créer un service de livraison de chaussettes dépareillées à domicile, pour ceux qui aiment le frisson de l'inconnu chaque matin.",
  "likes": 1,
  "commentaires": [
    {
      "texte": "Ceci est un commentaire génial pour cette idée !",
      "likes": 1, <=============ajout d'un like sur le commentaire✅
      "_id": "6893025b6f7ba7a6907919e9"
    }
  ],
  "__v": 1
}

Et puis voila tu sais tout maintenant tu te débrouille !!!!!!!!! Allez bisous.