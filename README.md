# Projet Hackathon

npm install
npm run dev

-----------------------------------------------------------------
Config .env

PORT = PORT || 3000  
MONGODB_URI = URL MongoDB || "mongodb+srv://jorisdavidmartinez:E8AGwAYsLXzYA6ZL@projethackaton.6s34drf.mongodb.net/"  
JWT_SECRET = code secret || "respirer_de_la_compote-ça-fait-tousser"

-----------------------------------------------------------------
Client : Ejs Tailwind
Tailwind : npx @tailwindcss/cli -i ./views/input.css -o ./views/styles.css --watch
```

global : views/partials/header.ejs views/partials/formBox.ejs

/ : views/pages/ideaList.ejs views/partials/componentIdeaList.ejs
|
|__/idea/:id : views/pages/ideaPage.ejs

```

-----------------------------------------------------------------
Server : NodeJS Express
Base de données : MongoDB 
```

```

-----------------------------------------------------------------
