const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
 Controllers.albumController.getAlbums(res);
})

router.post('/create', (req, res) => {
 Controllers.albumController.createAlbums(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.albumController.updateAlbum(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.albumController.deleteAlbum(req, res)
})
module.exports = router;