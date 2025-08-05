const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/routes");
const path = require('path');

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/", routes);


app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`))