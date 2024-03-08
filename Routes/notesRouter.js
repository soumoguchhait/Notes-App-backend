const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {createNote, getAllNotes,deleteNote, updateNote}=require("../Controller/notescontroller");
router.post("/create-note", createNote);
router.get("/get-note",  getAllNotes);
router.delete("/delete-note/:id",  deleteNote);
router.patch("/update-note/:id",  updateNote);


module.exports = router;