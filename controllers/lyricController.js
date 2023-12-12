"use strict";
const Models = require("../models");

const getLyrics = (res) => {
  Models.Lyric.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createLyrics = (data, res) => {
  Models.Lyric.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateLyric = (req, res) => {
  Models.Lyric.update(req.body, { where: { lyricId: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteLyric = (req, res) => {
  Models.Lyric.destroy({ where: { lyricId: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getLyrics,
  createLyrics,
  updateLyric,
  deleteLyric
};