// DEPENDENCIES 
const express = require("express");
const path = require("path");
const fs = require("fs");
let noteDB = require("./Develop/db/db.json");
//Use this to create a new id for each logged item:
const shortid = require('shortid');

// EXPRESS CONFIGURATION
// creating an "express" server
const app = express();

// Sets an Initial port for listeners
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//To serve static files such as images, CSS files, and JavaScript files, use this middleware:
app.use(express.static(__dirname + '/Develop/public'));

// ROUTES
//Routes to display the HTML pages:
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });
// If no matching route is found default to home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

 //GET the saved notes as a JSON object and display according to the corresponding GET in the index.js for the HTML:
 app.get('/api/notes', (req, res) => {
    res.json(noteDB);
});

//Create the POST request in order to create a new note entry:
app.post('/api/notes', (req, res) => {
    // req.body is available since we're using the body parsing middleware. Equal to the JSON post sent from the user.
    const newNote = req.body;
    //Adding id key to the object with a value that is a randomly generated, unique id to track the note:
    newNote.id = shortid.generate();
    //Pushing the object to the db.JSON file imported at the top of this server.js file:
    noteDB.push(newNote);
    // console.log(noteDB);

    let writeNote = JSON.stringify(noteDB);
    //Adding, but the db.json file has not yet been permanently changed. Need to write this to that file. To write, the opposite of parse is stringify:
    fs.writeFile("Develop/db/db.json", writeNote , (err)=>{
        if (err) throw err;
        console.log('The file has been saved!');
    });
    //Don't use allcaps for json here in this context. Will throw an error:
    res.json(noteDB);
  });

  //Create a DELETE request for an item based on it's unique ID:
  app.delete('/api/notes/:id', function (req, res) {
    // console.log(req.params.id);
    let deleteID = req.params.id;
    //Splice out the selected id from the array in the db.json file:
    noteDB.splice(deleteID, 1);
    // console.log(noteDB);

    //Write the new array to the db.json file to update it:
    fs.writeFile("Develop/db/db.json", JSON.stringify(noteDB) , (err)=>{
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.json(noteDB);
  });

// LISTENER
// Use this to "start" the server:
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });