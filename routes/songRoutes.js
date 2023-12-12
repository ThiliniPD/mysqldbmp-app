const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
 Controllers.songController.getSongs(res);
})

router.post('/create', (req, res) => {
 Controllers.songController.createSongs(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.songController.updateSong(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.songController.deleteSong(req, res)
})
module.exports = router;