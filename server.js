const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
//console.log(uuidv4());

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

app.get('/api/notes', (req, res) => {

fs.readFile('db/db.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
    //When data is coming from a json file, we always need to parse it, so the front end can read it!
    res.json(JSON.parse(data));
  })

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
app.post('/api/notes', (req, res) => {
    //req.body the information you sent from the back end
    const newNote = req.body;
  
    
    newNote.id = uuidv4();
    console.log(newNote);
    fs.readFile('db/db.json', 'utf8' , (err, note) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(note)
        let notejson = JSON.parse(note);
        notejson.push(newNote);
        console.log(notejson);
        fs.writeFile("db/db.json", JSON.stringify(notejson), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
            res.json(notejson);
        });

    })

});

//Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});