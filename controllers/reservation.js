const Reservation = require('../models/Reservation');
const fs = require('fs');


exports.ajoutResa = (req, res, next) => {
    delete req.body._id;
    const reservation = new Reservation({
        ...req.body,
        userId : req.userId
    });
    reservation.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.supp = (req, res, next) => {
    Reservation.findById(req.params.id)
    .then(resa => {
        if(resa === null){
            res.statut(400).json({ mess: 'Resa déjà supprimée'})
        }else{
            if (resa.userId == req.userId){
            Reservation.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ mess:'Utilisateur incorrect' });
            }
        }
    })
};

exports.affReservation = ((req,res, next) => {
    Reservation.findOne({_id: req.params.id})
    .then(reservation => res.status(200).json(reservation))
    .catch(error => res.status(400).json({ error }));
});

exports.affAllReservation = ((req, res, next) => {
Reservation.find({userId: req.userId})
.then(reservation => res.status(200).json(reservation))
.catch(error => res.status(400).json({ error }));
});
