// DEPENDENCIES 
const express = require("express");
const path = require("path");
const fs = require("fs");

// EXPRESS CONFIGURATION
// creating an "express" server
const app = express();

// Sets an Initial port for listeners
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
//Routes to display the HTML pages:
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../NoteTaker/Develop/public/notes.html'));
  });
// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../NoteTaker/Develop/public/index.html'));
});



// LISTENER
// Use this to "start" the server:
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });