const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router  = express.Router();

const users    = require("../controllers/users.controllers");
const auth = require('../middleware/auth')

router.get('/me', auth.isAuthenticated, function(req, res) {
  const data = {
    type:req.session.type
  };
    res.json(data);
});

router.post('/logout',(req, res, next)=> {
  req.session.destroy((err)=>{
    if (err) {
      return next(err)
    }
    res.json('déconnecté')
  })
})
  
router.post("/", users.createUsers);
// Retrieve all todo list
router.get("/",users.findAllUsers);

// Retrieve a single Todo with id
router.get("/:id", auth.isAdmin, users.findOneUsers);

// Update a Todo with id
router.put("/:id", auth.isAdmin, users.updateUsers);

// Delete a Todo with id
router.delete("/:id", auth.isAdmin, users.deleteUsers);

router.get("/par/:Prenom", auth.isAdmin, users.searchPrenomUsers);

module.exports = router;