const {
  model: { Notes },
} = require("../../../common/models");
const mongoose = require("mongoose"),
  ObjectId = mongoose.Types.ObjectId;

class NotesController {
  async createNotes(req, res, next) {
    try {
      // console.log("body;;;;", req.body);
      const { title, content, tags } = req.body;
      const createNote = new Notes({ title, content, tags });
      const createdNote = await createNote.save();
      return res.created({ createdNote }, "Note Created Successfuly !!");
    } catch (err) {
      return next(err);
    }
  }

  async findAllNotes(req, res, next) {
    try {
      // console.log("req,header2", req.headers);
      const findAllNotes = await Notes.find();
      return res.success({ findAllNotes }, "find all notes successfuly !!");
    } catch (err) {
      return next(err);
    }
  }

  async findSingleNotes(req, res, next) {
    try {
      // console.log("req.params;;;;", req.params);
      const findSingleNote = await Notes.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!findSingleNote) {
        return res.success({}, "note is not found !!");
      }
      return res.success({ findSingleNote }, "find a note successfuly !!");
    } catch (err) {
      return next(err);
    }
  }

  async updateSingleNotes(req, res, next) {
    try {
      const { title, content, tags } = req.body;
      let findSingleNote = await Notes.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!findSingleNote) {
        return res.success({}, "note is not found !!");
      }
      if (title) findSingleNote.title = title;
      if (content) findSingleNote.content = content;
      if (tags) findSingleNote.tags = tags;
      findSingleNote = await findSingleNote.save();
      return res.success({ findSingleNote }, "Update a note successfuly !!");
    } catch (err) {
      return next(err);
    }
  }

  async deleteSingleNotes(req, res, next) {
    try {
      // console.log("req.params;;;;", req.params);
      // return false;
      const findSingleNote = await Notes.findOneAndDelete({
        _id: new ObjectId(req.params.id),
      });
      if (!findSingleNote) {
        return res.success({}, "note is not found !!");
      }
      return res.success({}, "test message!!");
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new NotesController();