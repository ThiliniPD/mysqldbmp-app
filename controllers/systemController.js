//epopulate from API
//wait until album all done promise
//for each album all songs
//for each song lyrics

"use strict";

const axios = require('axios');
//const { release } = require('os');
const Models = require("../models");

/*
 Adds a album and all the songs to the database
 @param albumObj Album An Album object that contains all album details
 @return A Promise that resolves to true if successful.
*/
function AddSong(songObj){
    let addSongPromise = Models.Song.create(songObj)
    let lyricListFetchPromise = addSongPromise.then(() => {
        let lyricListUrl = `https://taylor-swift-api.sarbo.workers.dev/lyrics/${songObj.id}`
        return axios.get(lyricListUrl)
    })

    let addLyricPromise = lyricListFetchPromise.then((data) => {
        console.log(data.data)
        let lyricData = {
            content: data.data.lyrics, songId: songObj.id
        }
        let addLyric = Models.Lyric.create(lyricData)
        return addLyric
    })

    return addLyricPromise
}

function AddAlbum(albumObj) {
    let addAlbumPromise = Models.Album.create(albumObj)
    let songListFetchPromise = addAlbumPromise.then(() => {
        let songListUrl = `https://taylor-swift-api.sarbo.workers.dev/albums/${albumObj.id}`
        return axios.get(songListUrl)
    })

    let addSongsPromise = songListFetchPromise.then((data) => {
        console.log(data.data);
        let songData = data.data.map((song) => { 
            return {id: song.song_id, title:song.title, albumId: albumObj.id }
        })

        let promises = songData.map( songObj => {
            return AddSong(songObj)
        })

        return Promise.all(promises)
    })

    return addSongsPromise
}

const populateDatabase = (res) => {
    console.log('trying to get data from external api')
    axios.get("https://taylor-swift-api.sarbo.workers.dev/albums").then(data => {
        console.log(data.data);
        
        let albumData = data.data.map(album => { 
            return { 
                id: album.album_id, title:album.title, 
                releaseDate: album.release_date, artist:"Taylor Swift"
            }
        })

        let promises = albumData.map( albumObj => {
            return AddAlbum(albumObj)
        })

        return Promise.all(promises).then((result) => {
            res.send({ result: 200 });
        }).catch((err) => {
            res.send({ result: 500, error: err.message });
        })
    }).catch(err => {
        res.status(500).json({ data: err.message})
    })
}

const clearDatabase = (res) => {
    let clearLyricPromise = Models.Lyric.destroy({ where : {} })
    
    let clearSongPromise = clearLyricPromise.then(() => {
        return Models.Song.destroy({ where : {} })
    })

    let clearAlbumPromise = clearSongPromise.then(() => {
        return Models.Album.destroy({ where : {} })
    })

    clearAlbumPromise.then(() => {
        res.send({ result: 200 });
    }).catch((err) => {
        res.status(500).json({ data: err.message})
    })
}

module.exports = {
    populateDatabase,
    clearDatabase
}