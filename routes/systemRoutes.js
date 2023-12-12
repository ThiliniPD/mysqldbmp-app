const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/populate', (req, res) => {
    Controllers.systemController.populateDatabase(res);
})

router.get('/clear', (req, res) => {
    Controllers.systemController.clearDatabase(res);
})

module.exports = router;