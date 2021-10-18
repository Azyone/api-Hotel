const express = require("express");
const router = express.Router();
const Thing = require('../models/Thing');
const auth = require('../middleware/auth');
const { findByIdAndDelete } = require("../models/Thing");

router.post('/', auth, (req,res,next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

router.put('/:id', auth, (req, res, next) => {
    Thing.findById(req.params.id)
        .then(thing => {
            if (thing.userId == req.body.userId){
                Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ mess:'Utilisateur incorrect' });
            }
        })
});

router.delete('/:id', auth, (req, res, next) => {
    Thing.findById(req.params.id)
        .then(thing => {
            if (thing.userId == req.body.userId){
                Thing.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Deleted!'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ mess:'Utilisateur incorrect' });
            }
        })
});

router.get('/:id', auth, (req,res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});

router.get('/', auth, (req, res, next) => {
Thing.find()
.then(things => res.status(200).json(things))
.catch(error => res.status(400).json({ error }));
});

module.exports = router;