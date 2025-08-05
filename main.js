require('dotenv').config();

const express = require('express');
const app = express();
const connecterBaseDeDonnees = require('./database/database.js');
const routes = require('./routes/routes.js');
const PORT = 3000;

app.use(express.json());
app.use('/', routes);

connecterBaseDeDonnees();

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});