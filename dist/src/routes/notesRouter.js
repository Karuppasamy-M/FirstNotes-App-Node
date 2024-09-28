"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = __importDefault(require("../controller/notesController"));
const notesRouter = (0, express_1.Router)();
notesRouter.get("/getall/:sub_category_id", notesController_1.default.getAllNotes);
notesRouter.post("/getall/tag", notesController_1.default.getAllNotesByTag);
notesRouter.post("/getall/filter", notesController_1.default.getAllNotesFilter);
notesRouter.get("/get/recentnotes", notesController_1.default.getRecentNotes);
notesRouter.post("/create", notesController_1.default.createNote);
notesRouter.put("/update", notesController_1.default.updateNote);
notesRouter.delete("/delete/:note_id", notesController_1.default.deleteNote);
exports.default = notesRouter;
