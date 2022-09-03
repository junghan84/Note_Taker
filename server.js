//Require express 
const express = require("express");
const fs = require("fs");
const path = require('path');


//Use expess to initalize the 'app' server
const app = express()

//Use the 'app' and to 'listen' a specific 'PORT'
const PORT = process.env.PORT || 3000;


//POST /api/notes shold receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'));

//Require route file
require('./routes/routes')(app);

//Create listener
app.listen(PORT, () => {
    console.log(`"App liostening on PORT: " +  http://localhost:${PORT}`);
})