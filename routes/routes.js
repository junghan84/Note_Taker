const fs= require('fs');
const path = require('path');

module.exports = app => {

    //Set up notes variable
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) throw error;

        let notes = JSON.parse(data);

        //API Routes
        //Set up the /api/notes get routes

        app.get('/api/notes', function(req, res) {
            //read the db.json file and return all save notes
            res.json(notes);
        })

        //Set up the /api/notes post routes
        app.post('/api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title)
        })

        //Retrieves a note with specific id
        app.get('/api/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        })

        //Delete a note with specific id
        app.delete('/api/notes/:id', function(req, res) {
            notes.slice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id: " + req.params.id)
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