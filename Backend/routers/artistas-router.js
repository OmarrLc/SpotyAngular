const express = require('express');
const router = express.Router();
var artista = require('../models/artista');


//Obtener Artistas
router.get('/', (req, res) => {
    artista.find({}, {
        _id: true,
        nombreArtista: true
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })

});


//Obtener Albumes y canciones
router.get('/:idArtista/albumes', (req, res) => {
    artista.find({ _id: req.params.idArtista }, {
        albumes: true
    }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})
module.exports = router;