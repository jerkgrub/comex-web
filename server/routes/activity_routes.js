const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity_controller');

// insert routes here

// 1. Create
router.post('/api/activity/new', activityController.newActivity);

// 2. Read
router.get('/api/activity/all', activityController.findAllActivity);
router.get('/api/activity/:id', activityController.findOneActivity);

// 3. Update
router.put('/api/activity/update/:id', activityController.updateActivity);

// 4. Delete
router.delete('/api/activity/delete/:id', activityController.deleteActivity); //DELETE

// attendee section below ///////////////////////////////////////////////////////////////////////////////

// create
router.post('/api/activity/add/attendee/:id', activityController.addAttendee)

// read 
router.get('/api/activity/get/attendee/:id', activityController.getAllAttendees)

// delete
router.delete('/api/activity/attendee/:activityId/:email', activityController.deleteAttendee);


module.exports = router;