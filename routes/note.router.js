const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const auth = require('../middleware/auth');

// Routes
router.get('',auth, noteController.getAllNotes);
router.get('/:id',auth, noteController.getNoteById);
router.post('',auth, noteController.createNote);
router.put('/:id',auth, noteController.updateNote);
router.delete('/:id',auth, noteController.deleteNote);
router.post('/:id/share',auth, noteController.shareNote);
router.get('/shared/me',auth, noteController.sharedWithMe);

module.exports = router;
