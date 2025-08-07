const session = require("express-session");
// Middleware autorisation d'accès aux idées
function isAuth(req, res, next) {
  if (req.session && req.session.utilisateur) {
    return next();
  }
  res.redirect("/");
}

module.exports = isAuth;
