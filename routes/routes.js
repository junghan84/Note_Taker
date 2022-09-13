const fs= require('fs');
const path = require('path');
const {v4: uuidv4 } = require('uuid');
//const storeNote = require('../db/db.json');

let notes = require('../db/db.json');


module.exports = app => {

    //Set up notes variable
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) throw error;

       // let notes = JSON.parse(storeNote);       

        //API Routes
        //Set up the /api/notes get routes

        app.get('/api/notes', function(req, res) {
            fs.readFile('db/db.json', (err, data) => {
                if(err){
                    throw err
                };
                res.send(data);
            })
            //read the db.json file and return all save notes
            //res.json(notes);
        })

        //Set up the /api/notes post routes
        app.post('/api/notes', function(req, res) {
            let newNote = {
                id: uuidv4(),
                title: req.body.title,
                text: req.body.text
            };                      
            console.log(notes);
            notes.push(newNote);
            updateDb();
            //return console.log("Added new note: " + newNote.title)
            res.json('new note')
        })

        //Retrieves a note with specific id
        app.get('/api/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        })

        //Delete a note with specific id
        app.delete('/api/notes/:id', function(req, res) {
            console.log(req.params.id);
            notes = notes.filter(note => {
                return note.id !== req.params.id
            });
            updateDb();
            console.log("Deleted note with id: " + req.params.id)
            res.json('delete note')
        })

        //Display notes.html 
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        })

        //Display index.html 
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        })

        //Update json file
       function updateDb() {
        fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), error => {
            if (error) throw error;
            return true;
        })
       }
    })
}