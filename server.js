const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { v4:generateId } = require('uuid');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET request for accessing the note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//POST request for writing a new note
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
  res.json(`${req.method} request received/json frontend`);
  const { title, text } = req.body;
  if (title && text) {
  const newNote = { id: generateId(), title, text };
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // console.log(data)
    if (err) {
      console.error(err);
    } else {
      const savedNotes = JSON.parse(data);
      savedNotes.push(newNote);
      console.log(savedNotes);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(savedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("successfully added note!")
      );
    }
  });
  const response = {
    status: "success",
    body: "newReview",
  };
  console.log(response);
  res.status(201).json(response);}
  else {
    res.status(500).json('Error in posting review')
  }
});

//GET request for loading saved notes from the DB
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.listen(PORT, () =>
  console.log(`Note taking app listening at http://localhost:${PORT}.`)
);

//request for deleting notes
app.delete('/api/notes/:id', (req, res) =>
  {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      // console.log(data)
      if (err) {
        console.error(err);
      } else {
        const savedNotes = JSON.parse(data);
        const filteredNotes = savedNotes.filter((note) => {
          return note.id !== req.params.id
        })
        console.log(filteredNotes);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(filteredNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("successfully deleted note!")
        );
      }
    });
    const response = {
      status: "success",
      body: "Successfully deleted note",
    };
    console.log(response);
    res.status(201).json(response);}
  
)