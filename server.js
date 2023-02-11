const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    const { title, text } = req.body;
    console.log(title);
    console.log(text)
});

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')))

app.listen(PORT, () => console.log(`Note taking app listening at http://localhost:${PORT}.`));