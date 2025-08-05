
require('dotenv').config();

const express = require('express');
const app = express();
const connecterBaseDeDonnees = require('./database/database.js');
const router = require('./routes/routes.js');
const path = require("path");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Utilisation router
app.use("/", router);

connecterBaseDeDonnees();

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
