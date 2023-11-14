const db = require('../models/index')

exports.createUsers =async function(req, res){
	const{Nom,Prenom,Email,Password,Type}=req.body
    try {
        const user = await db.Users.create({Nom:Nom,Prenom:Prenom,Email:Email,Password:Password,Type:Type})
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message || "Some error occurred while create the Products",
        });
    }
}
//efa nisy modification bobaka tato
exports.findAllUsers = async (req, res) => {
    try {
        const users = await db.Users.findAll()
        res.json(users)
    } catch (error) {
        res.status(400).json({
            message: error.message || "Some error occurred while create the Products",
        });
    }
}


exports.findOneUsers = async (req, res) => {
	const id = req.params.id;
    try {
        const users = await db.Users.findByPk(id);
        res.json(users);
    } catch (error) {
        res.status(400).send({
            message: error.message || "Error retrieving Users with id=" + id,
        });
    }
};

exports.updateUsers = async (req, res) => {
	const id = req.params.id;
	const{Nom,Prenom,Email,Password,Type}=req.body
    try {
        const us = await db.Users.update({Nom:Nom,Prenom:Prenom,Email:Email,Password:Password,Type:Type}, {where: {id: id}})
        res.json(us)
    } catch (err) {
        res.status(400).send({
            message: err.message || "Error retrieving Users with id=" + id,
        });
    }
}

exports.deleteUsers = async (req, res) => {
  	const id = req.params.id;
  	await db.Users.destroy({
    	where: { id: id },
  	}).then((data) => {
    	if (data) {
      	res.send({
        	message: "User was delete successfully!",
      	});
    	} else {
      	res.send({
        	message: `Cannot delete User with id=${id}`,
      	});
    	}
  	});
};
exports.searchPrenomUsers =async (req, res) => {
	const Prenom = req.params.Prenom
    try {
        const users = await db.Users.findAll({where: { Prenom: Prenom }});
        if(users==null){
            res.json({message: "user invalid"})
        }
        res.json(users)
    } catch (error) {
        res.status(400).send({
            message: error.message ,
        });
    }
}

exports.createMatieres =async function(req, res){
	const{NomMatiere}=req.body
    try {
        const user = await db.Matieres.create({NomMatiere:NomMatiere})
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message || "Some error occurred while create the Products",
        });
    }
}

exports.findAllMatieres = async (req, res) => {
	try {
		const matiere = await db.Matieres.findAll({attributes: ['NomMatiere']})
		res.json(matiere)
	} catch (err) {
		res.status(400).json({
            message: err.message || "Some error occurred while create the Products",
        });
	}
}

exports.createPanier = async function(req, res){
    const{IdCours,IdUsers,StatusPaniers}=req.body
    // let date = new Date()
	
	try {
        const panier = await db.Paniers.create({IdCoursPaniers:IdCours,IdUsersPaniers:IdUsers,StatusPaniers:StatusPaniers})
		if (!panier) {
			console.log("err")
		}
        if (StatusPaniers=="Acheter") {
            const achat = await db.Achats.create({IdCoursAchats:IdCours,IdUsersAchats:IdUsers,Date: new Date(),StatusAchats:"valider"})
            
			res.json(achat)
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || "Some error occurred while create the Products",
        });
    } 
}


//trouver tous les achats dont le status de l'achat est valider
exports.findAllAchat = async function(req, res) {
    try {
        const achat = await db.Achats.findAll();
        res.json(achat)
    } catch (error) {
        res.status(400).send({
			message: err.message || "Some error occured while retrieving Products",
		});
    }
}

//mbola mila teste rehefa misy element ao anatin'ny table cours
//trouver tous les achats par chaque utilisateur
//trouver tous les cours achetées par chaque utilisateur
exports.findAllAchatUsers = async function(req, res) {
    const IdUsers = req.params.IdUsers;
    try {
		var CoursAcheterParUsers = [];
        const achat = await db.Achats.findAll({where: { IdUsersAchats: IdUsers }})
		const len = achat.length
        if (len>0) {
            for (let i = 0; i < len; i++) {
                const element = achat[i].IdCours;
                const cours = await db.Cours.findOne(element)
                CoursAcheterParUsers.push(cours)
            }
			res.json(CoursAcheterParUsers)
        }else {
			res.json({message:"Vous n'avez pas encore faire des achats"})
		}
		
    } catch (error) {
        res.status(400).send({
			message: error.message || "Some error occured while retrieving Products",
		});
    }
}

exports.createCours = async function(req, res){
	const {NomCours,Prix,ResumeCours,NomMatieres,NomEnseignant,Tags,Titre,ResumeChapitre,Video,Sequence} = req.body
	// const cours = {
	// 	NomCours: req.body.NomCours,
	// 	Prix: req.body.Prix,
	// 	ResumeCours: req.body.ResumeCours,
	// 	NomMatieres: req.body.NomMatieres,
	// 	NomEnseignant: req.body.NomEnseignant,
    //     Tags: req.body.Tags,
	// 	Chapitre: {
	// 		Titre: req.body.Titre,
	// 		ResumeChapitre: req.body.ResumeChapitre,
	// 		Video: req.body.Video,
	// 		Sequence: req.body.Sequence
	// 	}
	// };

	try {
		const matiere= await db.Matieres.findOne({where: { NomMatiere: NomMatieres }});
		if (!matiere) {
			//mila manao create matiere reha tsy misy ilay matiere
			res.json({message:"pas de matiere correspondant"})
		} else {
			console.log("matiere", matiere.id)
			try {
				const user = await db.Users.findOne({where: {Nom: NomEnseignant}});
				if (user) {
					const IdMatiereCours = matiere.id;
					const IdUsersTypeEnseignantCours = user.id
					console.log('users',IdUsersTypeEnseignantCours)
					try {
						const tag = await db.Tags.create({Tags: Tags})
						console.log('tags', tag)
						const Chapitre = await db.Chapitres.create({Titre,ResumeChapitre,Video,Sequence})
						console.log('Chapitre', Chapitre)
						if (tag || Chapitre) {
							const cours = await db.Cours.create({NomCours:NomCours,Prix:Prix,ResumeCours:ResumeCours,IdMatiereCours:IdMatiereCours,IdUsersTypeEnseignantCours:IdUsersTypeEnseignantCours,IdTagsCours:tag.id,IdChapitreCours:Chapitre.id})
							if (!cours) {
								res.json("misy tsy mety any")
							}
							res.json(cours)
						}
					} catch (errore) {
						res.json(errore)
					}
				} else {
					res.json({message:"pas d'utilisateur trouver"})
				}
			} catch (error) {
				res.json(error)
			}
		}
	} catch (erro) {
		res.json(erro)
	}
}

exports.findAllCours = (req, res) => {
	db.Cours.findAll()
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		res.status(400).send("eeeee");
	});
}

exports.findOneCours = (req, res) => {
	const id = req.params.id;
	Cours.findByPk(id)
	    .then((data) => {
	        res.send(data);
	    })
	    .catch((err) => {
	      	res.status(400).send({
	        	message: "Error retrieving Users with id=" + id,
	      	});
	    });
};

//rechercher un cours par son nom, matiere, enseignant, tags
//mila verification eto fa misy contrainte soit tsy mety le gestion d'erreur soit eo am le catch mintsy no tsy mety fa zavatra tokony ao anaty then
exports.findOnecoursParNomMatiereEnseignantTags = function (req, res) {
	const NomCours = req.params.NomCours
	Cours.findOne({where: {NomCours: NomCours}}).then((dataNomCours) => {
		res.json(dataNomCours);
	}).catch(() => {
		Cours.findOne({where: {NomMatieres: NomCours}}).then((dataNomMatiere)=> {
			res.json(dataNomMatiere)
		}).catch(()=>{
			Cours.findOne({where: {NomEnseignant: NomCours}}).then((dataNomEnseignant)=> {
				res.json(dataNomEnseignant)
			}).catch(()=>{
				Cours.findOne({where: {Tags: NomCours}}).then((dataTags)=>{
					res.json(dataTags)
				}).catch((err)=>{
					res.status(400).send({message: "l'élément que vous avez recherché ni nom d'un cours, ni nom d'une matière, ni nom d'un enseignant, ni de tags. Alors vérifier votre élément de recherche"})
				})
			})
		})
	})
	
}

//mbola tsy mety ito fa mila amboarina tsara
exports.updateCours = (req, res) => {
	const id = req.params.id;
	const cours = {
		NomCours: req.body.NomCours,
		Prix: req.body.Prix,
		Resume: req.body.Resume,
		IdMatiere: req.body.IdMatiere,
		IdEnseignant: req.body.IdEnseignant,
        IdTags: req.body.IdTags,
		IdChapitre: req.body.IdChapitre
	};
	Cours.update(cours, {
		where: {
			id: id
		}
	}).then((data) => {
		if (data) {
			Users.findOne({
				where: {
					id: id
				}
			})
		} else {
			res.send({
			  	message: `Cannot update User with`,
			});
	  	}
	});
}

//mila ampiana fa tokony refa mifafa ny cours 1 de tokony hifafa koa zay mifanandray aminy any.
exports.deleteCours = (req, res) => {
  	const id = req.params.id;
  	Cours.destroy({
    	where: { id: id },
  	}).then((data) => {
    	if (data) {
      	res.send({
        	message: "User was delete successfully!",
      	});
    	} else {
      	res.send({
        	message: `Cannot delete User with id=${id}`,
      	});
    	}
  	});
};