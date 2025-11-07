let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
  dateDeRendu: Date,
  nom: String,
  rendu: Boolean,
  description: String,
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignmentsRefactor');
