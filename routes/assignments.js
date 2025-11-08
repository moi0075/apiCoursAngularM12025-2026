let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  var aggregateQuery = Assignment.aggregate();
  Assignment.aggregatePaginate(
    aggregateQuery,
    { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 10 },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

function getAssignment(req, res) {
  Assignment.findById(req.params.id)
    .then(assignment => {
      if (!assignment) {
        return res.status(404).send({ message: 'Devoir non trouvé' });
      }
      res.json(assignment); // Envoie le devoir trouvé
    })
    .catch(err => {
      res.status(500).send(err); // Gère les erreurs
    });
}

// Ajout d'un assignment (POST)
// function postAssignment(req, res) {
//   let assignment = new Assignment();
//   assignment.id = req.body.id;
//   assignment.nom = req.body.nom;
//   assignment.dateDeRendu = req.body.dateDeRendu;
//   assignment.rendu = req.body.rendu;
//   assignment.description = req.body.description;

//   console.log('POST assignment reçu :');
//   console.log(assignment);

//   assignment.save((err, savedAssignment) => {
//     // savedAssignment est l'assignment tel qu'il a été sauvegardé dans la BDD, avec son _id
//     if (err) {
//       res.send('cant post assignment ', err);
//     }
//     // res.json({ message: `${assignment.nom} saved!`})
//     res.json(savedAssignment); // on renvoie l'assignment sauvegardé avec son _id
//   });
// }

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.description = req.body.description;

  console.log('POST assignment reçu :');
  console.log(assignment);

  // .save() retourne maintenant une Promesse
  assignment.save() 
    .then(savedAssignment => {
      // Gère le succès
      res.json(savedAssignment); // on renvoie l'assignment sauvegardé
    })
    .catch(err => {
      // Gère l'erreur
      res.send('cant post assignment ', err);
    });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then(assignment => {      
      if (!assignment) {
        return res.status(404).send({ message: 'Devoir non trouvé, mise à jour impossible.' });
      }
      console.log('updated ', assignment);
      res.json(assignment); // On renvoie le document mis à jour
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

// suppression d'un assignment (DELETE) nouvelle version avec promesses
function deleteAssignment(req, res) {
    Assignment.findByIdAndDelete(req.params.id)
        .then(assignment => { // 'assignment' est le document qui vient d'être supprimé            
            // Si Mongoose ne trouve rien, 'assignment' est 'null'.
            if (!assignment) {
                return res.status(404).send({ message: 'Devoir non trouvé' });
            }
            res.json({message: `${assignment.nom} deleted`});
        })
        .catch(err => {
            // Gère les erreurs (ex: ID mal formé)
            res.status(500).send(err);
        });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
};
