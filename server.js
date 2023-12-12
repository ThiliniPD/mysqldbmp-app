const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");

// parse requests of content-type -application/json
app.use(express.json());
app.get("/", (req, res) => {
 res.json({ message: "Welcome to my MongoDB application." });
});

let albumRoutes = require('./routes/albumRoutes')
app.use('/api/albums', albumRoutes)

let songRoutes = require('./routes/songRoutes')
app.use('/api/songs', songRoutes)

let lyricRoutes = require('./routes/lyricRoutes')
app.use('/api/lyrics', lyricRoutes)

let systemRoutes = require('./routes/systemRoutes')
app.use('/api/system', systemRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
});
