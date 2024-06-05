const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({

    //note title
    n_title: {
        type: String
    },

    //left side
    priority1: {
        type: String
    },

    priority2: {
        type: String
    },

    priority3: {
        type: String
    },

    braindump: {
        type: String
    },

    //right side
    n_date: {
        type: String
    },

    // column 1
    c1r1: {
    type: String
    },
    c1r2: {
    type: String
    },
    c1r3: {
    type: String
    },
    c1r4: {
    type: String
    },
    c1r5: {
    type: String
    },
    c1r6: {
    type: String
    },
    c1r7: {
    type: String
    },
    c1r8: {
    type: String
    },
    c1r9: {
    type: String
    },
    c1r10: {
    type: String
    },
    c1r11: {
    type: String
    },
    c1r12: {
    type: String
    },
    c1r13: {
    type: String
    },
    c1r14: {
    type: String
    },
    c1r15: {
    type: String
    },
    c1r16: {
    type: String
    },
    c1r17: {
    type: String
    },
    c1r18: {
    type: String
    },
    c1r19: {
    type: String
    },


    //column2
    c2r1: {
    type: String
    },
    c2r2: {
    type: String
    },
    c2r3: {
    type: String
    },
    c2r4: {
    type: String
    },
    c2r5: {
    type: String
    },
    c2r6: {
    type: String
    },
    c2r7: {
    type: String
    },
    c2r8: {
    type: String
    },
    c2r9: {
    type: String
    },
    c2r10: {
    type: String
    },
    c2r11: {
    type: String
    },
    c2r12: {
    type: String
    },
    c2r13: {
    type: String
    },
    c2r14: {
    type: String
    },
    c2r15: {
    type: String
    },
    c2r16: {
    type: String
    },
    c2r17: {
    type: String
    },
    c2r18: {
    type: String
    },
    c2r19: {
    type: String
    }

});
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;