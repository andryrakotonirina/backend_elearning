// middleware/multerMiddleware.js
const multer = require('multer');
// const Video = require('../models/video'); // Assurez-vous que le chemin est correct
const db = require('../models/index');
const Cours = db.Cours;
const Chapitres = db.Chapitres

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/photo');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const multerMiddleware = upload.single('PhotoCours');

// Middleware pour traiter le formulaire multipart/form-data
const handleFileUpload = async (req, res, next) => {
  try {
    // Vous pouvez accéder aux autres champs du formulaire à partir de req.body
    const { NomCours, Prix, ResumeCours, IdMatiereCours, IdUsersTypeEnseignant, IdTagsCours } = req.body;

    // Créer une instance du modèle Video
    const cours = new Cours({
      NomCours,
      Prix,
      ResumeCours,
      IdMatiereCours,
      IdUsersTypeEnseignant,
      IdTagsCours,
      PhotoCours: req.file.filename, // Nom du fichier uploadé
    });

    // Enregistrer dans la base de données
    await cours.save();

    // Poursuivre le traitement normal si nécessaire
    next();
  } catch (error) {
    // Gérer les erreurs ici
    console.error(error);
    res.status(500).send('Erreur lors de l\'enregistrement du fichier dans la base de données.');
  }
};

module.exports = { multerMiddleware, handleFileUpload };
