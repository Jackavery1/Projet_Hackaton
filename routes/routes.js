const express = require("express");
const router = express.Router();
const accueilController = require("../controllers/controllers");

router.get("/", accueilController.afficherAccueil);

module.exports = router
