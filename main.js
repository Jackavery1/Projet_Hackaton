const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const router = require("./routes/routes");

//Utilisation router
app.use("/", router);

// Connexion MongoDB
const initDB = require("./database/database");
initDB();

// Connexion localhost
app.listen(port, () => {
  console.log(`🚀 Serveur lancé : http://localhost:${port}`);
});
