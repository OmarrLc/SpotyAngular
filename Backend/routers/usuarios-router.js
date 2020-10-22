const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    usuario.find({}, { _id: true, nombreUsuario: true })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

//Obtener Playlist
router.get('/:idUsuario/playlists/:idPlaylist', (req, res) => {
    usuario.find({
            _id: req.params.idUsuario,
            "playlists._id": mongoose.Types.ObjectId(req.params.idPlaylist)
        }, { "playlists.$": true })
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });

});
// Obtener el listado de todas las playlist
router.get('/:idUsuario/playlists', (req, res) => {
    usuario.find({
            _id: req.params.idUsuario
        }, { playlists: true })
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});
// Guardar cancion en playlists
router.post('/:idUsuario/playlists/:idPlaylist/canciones', (req, res) => {
    usuario.update({
            _id: req.params.idUsuario,
            "playlists._id": mongoose.Types.ObjectId(req.params.idPlaylist)
        }, {
            $push: {
                "playlists.$.canciones": {
                    nombreCancion: req.body.nombreCancion,
                    artista: req.body.artista,
                    album: req.body.album
                }
            }
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })

})

// Crear un nuevo Playlist
router.post('/:idUsuario/playlists', (req, res) => {
    usuario.update({
            _id: mongoose.Types.ObjectId(req.params.idUsuario)
        }, {
            $push: {
                playlists: {
                    _id: mongoose.Types.ObjectId(),
                    tituloPlaylist: req.body.tituloPlaylist,
                    canciones: []
                }
            }
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        })

})

module.exports = router;