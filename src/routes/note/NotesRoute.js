const express = require("express");
const router = express.Router();
const NotesController = require("./NotesController");
const validationfun = require("../../../common/utils/commonValidation");
const { requireId, requirebody } = require("./NotesValidation");
const { protectRoute } = require("../../../common/utils/utils");

router.post(
  "/notes",
  protectRoute,
  validationfun(requirebody, "body"),
  NotesController.createNotes
);
router.get("/notes", protectRoute, NotesController.findAllNotes);
router.get(
  "/notes/:id",
  protectRoute,
  validationfun(requireId, "params"),
  NotesController.findSingleNotes
);

router.put(
  "/notes/:id",
  protectRoute,
  validationfun(requireId, "params"),
  validationfun(requirebody, "body"),
  NotesController.updateSingleNotes
);
router.delete(
  "/notes/:id",
  protectRoute,
  validationfun(requireId, "params"),
  NotesController.deleteSingleNotes
);
module.exports = router;
