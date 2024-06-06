const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    event_title: {
        type: String
    },
    event_organizer: {
        type: String
    },
    event_description: {
        type: String
    },
    event_image: {
        type: String
    },
    event_organizer: {
        type: String
    },
    event_date: {
        type: Date
    },
    event_time: {
        type: String
    },
    
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;