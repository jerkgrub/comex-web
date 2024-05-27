const Note = require('../models/note_model');
 
const findAllNote = (req, res) => {
    Note.find()
        .then((allDaNote) => {
            res.json({ theNote: allDaNote })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

const findNoteByName = (req, res) => {
    Note.findOne({n_title: req.params.ntitlex})
        .then((theNote) => {
            res.json({theNote})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

const findNoteByIdDelete = (req, res) => {
    Note.findOneAndDelete({n_title: req.params.ntitlex})
        .then((deletedNote) => {
            res.json({ theNote: deletedNote, message:"Successfully deleted the entry" })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

const newNote = (req, res) => {
    Note.create(req.body)
        .then((newNote) => {
            res.json({ newNote: newNote,status:"successfully inserted" })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

const updateNote = (req, res) => {
    Note.findOneAndUpdate({n_title:req.params.ntitlex},req.body, 
        { new: true, runValidators: true })
        .then((updatedNote) => {
            res.json({ updatedNote: updatedNote,status:"successfully Updated the Note" })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports = {
    findAllNote,
    newNote,
    findNoteByName,
    findNoteByIdDelete,
    updateNote
}