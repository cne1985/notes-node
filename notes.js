// console.log('Starting notes.js');

const fs = require('fs')

// Function trys to read from notes-data.json, if the file is present it will return the contents of the file as a JS object
// If there is an error e.g. the file doesn't exist, the catch block will return a blank array so that the file can be created.   
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

// Function takes the JS object and saves it to notes-data.json in string format
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes(); // either returns all existing notes or a blank array
    var note = {
        title,
        body
    }; // creates an object based on the yarg input from app.js 
    var duplicateNotes = notes.filter((note) => note.title === title); // does a check on the existing notes to see if the new note is a duplicate

    // adds the note to the array if there are no duplicates.
    if (duplicateNotes.length === 0){
        notes.push(note) //adds it to the end of the array
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note => note.title !== title));
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    debugger;
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log('---');
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
