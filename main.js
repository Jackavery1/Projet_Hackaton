require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const connecterBaseDeDonnees = require('./database/database.js');
const ideesRoutes = require('./routes/routes.js');
const routes = require('./routes/routes.js');

const PORT = process.env.PORT || 3000;
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Congig EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Config session
app.use(
  session({
    secret: "secret_motdepasse",
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/idees', ideesRoutes);
app.use('/categories', routes); 
app.use('/', routes);

connecterBaseDeDonnees();

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});