const session = require('express-session');
const db = require("../models/index");

const isAuthenticated = async (req, res, next) => {
  if (req.session.authenticated) {
    next()
  } else {
    res.status(401).json({message: "non Authentifié"})
  }
};

const isAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.session.type == 'admins') {
      next();
    } else {
      res.status(403).json({
        message: "Error: {Votre status n'est pas autorisé à cette requete}"
      });
    }
  })
}

module.exports = {
  isAuthenticated,
  isAdmin
}