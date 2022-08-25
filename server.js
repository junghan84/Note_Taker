//Require express 
const express = require("express");

//Use expess to initalize the 'app' server
const app = express()

//Use the 'app' and to 'listen' a specific 'PORT'
const PORT = 3000

// Get /notes should return the notes.html file

// Get * should return to the index.html file

// Get /api/ notes should read the db.json file

//POST /api/notes shold receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.use(express.urlencoded({extended: true}))
app.use(express.json());



app.listen(PORT, () => {
    console.log(`"App liostening on PORT: " + ${PORT}!`);
})