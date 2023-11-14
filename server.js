const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const passport  = require('passport');
const cors = require("cors");



var UsersRoutes = require('./routes/users.routes');
var AutreRoutes = require("./routes/routes.autre");

const db = require('./models/index')
require('dotenv').config();

var app = express();

var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(session(
  {
    secret: process.env.secret_sess,
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 100 * 60 * 60 * 24 * 30 }
  })
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptionsDelegate));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type','Authorization']);
  res.setHeader('Access-Control-Allow-Credentials', true)
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
})

//upload photo avec multer efa mety
const multerMiddleware = require('./middleware/multer');
app.post('/upload', multerMiddleware.multerMiddleware, multerMiddleware.handleFileUpload, (req, res) => {
  res.send('Fichier téléchargé et enregistré avec succès dans la base de données !');
});

const multer = require('./middleware/multerVideo');
app.post('api/chapitre', multer.multerChapitres, multer.handleFileUploadChapitres, (req, res) => {
  res.send('Fichier téléchargé et enregistré avec succès dans la base de données !')
})

app.post('/api/login', async (req,res) => {
  const {Email, Password} = req.body
  const users = await db.Users.findOne({where: { Email: Email }});
  
  try {
    console.log(users.Password)
    if (users.Password === Password) {
      req.session.authenticated = true
      req.session.type = users.Type;
      res.json(users.Type)
    } else {
      res.status(401).json({message: "Authentification échoué"})
    }
  } catch (error) {
    res.status(401).json({message: "Authentification échoué", error})
  }
})

app.use('/api/users', UsersRoutes);
app.use('/api/achats', AutreRoutes)

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
console.log(`Server is running.`,);
console.log(PORT)
});