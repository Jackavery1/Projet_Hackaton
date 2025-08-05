const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../models/models");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token manquant ou invalide (doit commencer par 'Bearer ')." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await Utilisateur.findById(payload.id);
    if (!user) {throw new Error("Etrange cet utilsateur ne va pas avec ce token.");
        }
    req.user = user;
    next();
    } catch (err) {
        return res.status(401).json({ error: "Token foutu recommence." });
    }
};
