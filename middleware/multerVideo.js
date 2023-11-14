// middleware/multerMiddleware.js
const multer = require('multer');
// const Video = require('../models/video'); // Assurez-vous que le chemin est correct
const db = require('../models/index');
// const Cours = db.Cours;
const Chapitres = db.Chapitres

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/video');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const multerChapitres = upload.single('Video');

const handleFileUploadChapitres = async (req, res, next) => {
    try {
      // Vous pouvez accéder aux autres champs du formulaire à partir de req.body
      const { Titre, ResumeChapitre, Sequence, IdCoursChapitre } = req.body;
  
      // Créer une instance du modèle Video
      const chapitres = new Chapitres({
        Titre,
        ResumeChapitre,
        Sequence,
        IdCoursChapitre,
        Video: req.file.filename, // Nom du fichier uploadé
      });
  
      // Enregistrer dans la base de données
      await chapitres.save();
  
      // Poursuivre le traitement normal si nécessaire
      next();
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error);
      res.status(500).send('Erreur lors de l\'enregistrement du fichier dans la base de données.');
    }
  };

  module.exports = { multerChapitres, handleFileUploadChapitres };