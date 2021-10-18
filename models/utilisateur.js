const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    nom : { type: String, required: true},
    prenom : { type: String, required: true},
    mail : { type: String, required: true, unique: true},
    numero : { type: String, required: true},
    type : { type: String, required: true},
    password : { type: String, required: true }
});

userSchema.plugin(unique);

module.exports = mongoose.model('Utilisateur', userSchema);