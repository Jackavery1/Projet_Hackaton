
// require('dotenv').config();

// const express = require('express');
// const app = express();
// const connecterBaseDeDonnees = require('./database/database.js');
// const router = require('./routes/routes.js');
// const path = require("path");
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// //Utilisation router
// app.use("/", router);

// connecterBaseDeDonnees();

// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const app = express();
const path = require("path");

const connecterBaseDeDonnees = require('./database/database.js');
const ideesRoutes = require('./routes/routes.js');
const routes = require('./routes/routes.js');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/idees', ideesRoutes);
app.use('/categories', routes); 
app.use('/', routes);
connecterBaseDeDonnees();

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});