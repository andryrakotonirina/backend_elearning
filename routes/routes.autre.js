const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth')
const cours = require("../controllers/cours.controlleurs");

//rehefa mi-creer panier de tonga de mi-creer achat koa
router.post("/", auth.isAuthenticated, cours.createPanier);
router.post("/matieres", auth.isAuthenticated, cours.createMatieres);
router.get("/matieres", auth.isAuthenticated, cours.findAllMatieres)

router.get("/", auth.isAuthenticated, cours.findAllAchat);
router.get("/users/:IdUsers", auth.isAuthenticated, cours.findAllAchatUsers)
router.post("/cours", auth.isAuthenticated, cours.createCours)
router.get("/cours", auth.isAuthenticated, cours.findAllCours)

module.exports = router;