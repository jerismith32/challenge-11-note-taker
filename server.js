const express = require("express");
const path = require("path");
const fs = require("fs");
//This allows us to create each note with a unique id
const { v4: uuidv4 } = require('uuid');
//console.log(uuidv4());

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Allows us to "expose" everything in the public folder, which is the front end to the back end
app.use(express.static(__dirname + '/public'));

// Routes

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
    //console.log(data)
    //When data is coming from a json file, we always need to parse it, so the front end can read it!
    res.json(JSON.parse(data));
    })

});

app.get('/api/notes/:id', (req, res) => {
    let pastNote = fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
        console.error(err)
        return res.json(pastNote)[Number(req.params.id)];
        }
    })    
});

// Create a POST route that adds the new note with a specific id
app.post('/api/notes', (req, res) => {
    //req.body the information you sent from the back end
    const newNote = req.body;
    // This will give the new note a specific id as coded in the index.js file
    newNote.id = uuidv4();
    //console.log(newNote);
    fs.readFile('db/db.json', 'utf8' , (err, note) => {
        if (err) {
          console.error(err)
          return
        }
        //console.log(note)
        //When data is coming from a json file, we always need to parse it, so the front end can read it!
        let notejson = JSON.parse(note);
        notejson.push(newNote);
        //console.log(notejson);
        //Here we need to use the stringify (basically the opposite of parse)
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

//This will allow you to delete past notes
// app.delete('/api/notes/:id', (req, res, next) => {
//     const noteinQuestion = req.params.id;
//     fs.readFile('db/db.json', 'utf8' , (err, note) => {
//         if (err) {
//         console.error(err)
//         let notetoDelete = JSON.parse(note);
//         notetoDelete.delete(noteinQuestion, (err) => {
//             if (err) return next(err);
//             res.send({ message: 'Deleted' });
//            });
        
//         }
//     }) 
//     // const id = req.params.id;
//     // //Article is giving an error, not definited
//     // Article.delete(id, (err) => {
//     //  if (err) return next(err);
//     //  res.send({ message: 'Deleted' });
//     // });
// });

// app.delete("/api/notes/:id", (req, res) => {
//     console.log("req params", req.params.id)
//     myArray = myArray.filter(({ id }) => id !== req.params.id);
// });

// app.delete('/api/notes/:id', (req, res) => {
//     //req.body the information you sent from the back end
//     const deleteNote = req.body;
//     fs.readFile('db/db.json', 'utf8' , (err, note) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//         //console.log(note)
//         //When data is coming from a json file, we always need to parse it, so the front end can read it!
//         let notejson = JSON.parse(note);
//         notejson.push(newNote);
//         //console.log(notejson);
//         //Here we need to use the stringify (basically the opposite of parse)
//         fs.writeFile("db/db.json", JSON.stringify(notejson), (err) => {
//             if (err) console.log(err);
//             console.log("Successfully Written to File.");
//             res.json(notejson);
//         });

//     })

// });

// app.delete("/api/notes/:id", function(req, res) {
//     console.log("req params", req.params.id)
//     //myArray not defined
//     const itemIndex = myArray.findIndex(({ id }) => id === req.params.id);
//     if (itemIndex >= 0) {
//       myArray.splice(itemIndex, 1);
//     }
// });