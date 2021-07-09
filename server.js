const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3232;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Allows us to "expose" everything in the public folder, which is the front end to the back end
app.use(express.static(__dirname + '/public'));

//Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
  
// app.get('/yoda', (req, res) => {
//     res.json(yoda);
// });
  
// app.get('/darthmaul', (req, res) => {
//     res.json(darthmaul);
// });
  
// Create a new Express route that leads users to the new Obi Wan Kenobi data
// app.get('/obiwankenobi', (req, res) => {
//     res.json(obiwankenobi);
// });


// Create just one GET route that returns any given specific character
// app.get('/api/characters/:character', (req, res) => {
//     const chosen = req.params.character;
//     // Iterate through the characters' routeNames to check if it matches `req.params.character`
//     for (let i = 0; i < characters.length; i++) {
//         if (chosen === characters[i].routeName) {
//             return res.json(characters[i]);
//         }
//     }
//     return res.send('No character found');
// });

// // Create a POST route that adds new characters
// app.post('/api/characters', (req, res) => {
//     const newCharacter = req.body;
  
//     console.log(newCharacter);
  
//     characters.push(newCharacter);
  
//     res.json(newCharacter);
// });

//Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});