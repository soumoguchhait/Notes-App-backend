const notesModel = require("../Models/notesmodel");

const createNote = async (req, res) => {
  const note = req.body;

  const newNote = new notesModel(note);

  try {
    await newNote.save();
    return res.status(201).json({
      status: 201,
      message: "Note Created Successfully",
      result: newNote,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({});
    return res.status(200).json({
      status: 200,
      message: "Notes fetched Successfully",
      result: notes,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const findOneAndDelete = await notesModel.findOneAndDelete({ _id: id });

    if (!findOneAndDelete) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const updateNote = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    try {
      const findOneAndUpdate = await notesModel.findOneAndUpdate(
        { _id: id },
        updatedData
      );
  
      if (!findOneAndUpdate) {
        return res.status(404).json({
          status: 404,
          message: "Note not found",
        });
      }
  
      const updatedNote = await notesModel.findById(id);
      return res.status(200).json({
        status: 200,
        message: "Note Updated Successfully",
        result: updatedNote,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

module.exports = {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
};