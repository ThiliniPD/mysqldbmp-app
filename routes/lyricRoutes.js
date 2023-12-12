const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
 Controllers.lyricController.getLyrics(res);
})

router.post('/create', (req, res) => {
 Controllers.lyricController.createLyrics(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.lyricController.updateLyric(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.lyricController.deleteLyric(req, res)
})
module.exports = router;