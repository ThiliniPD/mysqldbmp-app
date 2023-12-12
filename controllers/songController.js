"use strict";
const Models = require("../models");
const { Op } = require('sequelize');

  
const getSongs = (albumId, startsWith, res) => {
  let filter = { }
  let whereStatrsWith = undefined
  let whereAlbumId= undefined

  if (startsWith != undefined) {
    whereStatrsWith = {
      title: {
        [Op.startsWith]:startsWith
      }
    }
  }

  if (albumId != undefined) {
    whereAlbumId = {
      albumId: albumId
    }
  }

  if (whereStatrsWith != undefined && whereAlbumId != undefined) {
    filter.where = {
      [Op.and]: [
        whereAlbumId,
        startsWith
      ]
    }
  }
  else if (whereStatrsWith != undefined) {
    filter.where = whereStatrsWith
  }
  else if (whereAlbumId != undefined) {
    filter.where = whereAlbumId
  }
  
  Models.Song.findAll(filter)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createSongs = (data, res) => {
  Models.Song.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateSong = (req, res) => {
  Models.Song.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteSong = (req, res) => {
  Models.Song.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getSongs,
  createSongs,
  updateSong,
  deleteSong
};