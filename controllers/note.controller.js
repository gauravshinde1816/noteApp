const Note = require('../models/Note');

// GET /api/notes
exports.getAllNotes = async (req, res) => {
  const { q } = req.query;
  try {
    if (q != null) {
      const notes = await searchNotes(q, req.user.id) 
      res.json(notes)
    } else {
      const notes = await Note.find({ createdBy: req.user.id });
      res.json(notes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/search?q=:query
const searchNotes = async (query, user) => {
  try {
    const notes = await Note.find({
      createdBy: user,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });
    return notes
  } catch (error) {
    console.error({ message: error.message });
  }
};


// GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/notes
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content, createdBy: req.user.id });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/notes/:id/share
exports.shareNote = async (req, res) => {
  const { sharedUserId } = req.body;
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (!note.sharedWith.includes(sharedUserId) && note.createdBy !== sharedUserId) {
      note.sharedWith.push(sharedUserId);
      await note.save();
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET /api/notes/shared
exports.sharedWithMe= async (req, res) => {
  try {
    const sharedNotes = await Note.find({ sharedWith: { $in: [req.user.id] } });
    res.json(sharedNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};