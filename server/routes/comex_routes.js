const express = require('express');
const router = express.Router();
const ComexController = require('../controllers/comex_controller');

router.get('/api/test', (req, res) => { res.json({ message: "the api is working" }) });
router.post('/api/note/new', ComexController.newNote);
router.put('/api/note/update/:ntitlex', ComexController.updateNote);
router.get('/api/note/all', ComexController.findAllNote);
router.get('/api/note/:ntitlex', ComexController.findNoteByName);
router.delete('/api/note/delete/:ntitlex', ComexController.findNoteByIdDelete);

module.exports = router;