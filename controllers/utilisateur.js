const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateur');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                mail : req.body.mail,
                nom : req.body.nom,
                prenom : req.body.prenom,
                numero : req.body.numero,
                type : req.body.type,
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur enregisté !"}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email })
    .then(user => {
        if(!user){
            return res.status(401).json({ error : "Utilisateur non reconnu !"})
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error : "mot de passe incorrect"});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};