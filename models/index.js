'use strict'
const Album = require('./album') //require the model
const Song = require('./song')
const Lyric = require('./lyric')

async function init() {
 await Album.sync(); //sync the model
 await Song.sync();
 await Lyric.sync();
};

init();

Song.belongsTo(Album);
Album.hasMany(Song);

Lyric.belongsTo(Song);
Song.hasOne(Lyric);

module.exports = {
 Album,
 Song, 
 Lyric
};