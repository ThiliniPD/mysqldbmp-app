//json album take and conect to db
//add 1 album and get songs 
//add 1 song and connect to db
// add one lyric and connect to db

"use strict";

const axios = require('axios');
//const { release } = require('os');
const Models = require("../models");

const populateDatabase = (res) => {
    console.log('trying to get data from external api')
    axios.get("https://taylor-swift-api.sarbo.workers.dev/albums").then(data => {
        console.log(data.data);
        
        let albumData = data.data.map(album => { return {id: album.album_id, 
            title:album.title,  releaseDate: album.release_date, artist:"Taylor Swift"}
        })

        let promises = albumData.map( albumObj => {
            return Models.Album.create(albumObj)
        })

        Promise.all(promises).then((result) => {
            res.send({ result: 200 });
        }).catch((err) => {
            res.send({ result: 500, error: err.message });
        })

    }).catch(err => {
        res.status(500).json({ data: err.message})
    })
}

module.exports = {
    populateDatabase
}