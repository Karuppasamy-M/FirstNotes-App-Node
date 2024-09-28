import { Router } from "express";
import notesController from "../controller/notesController";

class NotesRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/getall/:sub_category_id", notesController.getAllNotes);
        this.router.post("/getall/tag", notesController.getAllNotesByTag);
        this.router.post("/getall/filter", notesController.getAllNotesFilter);
        this.router.get("/get/recentnotes", notesController.getRecentNotes);
        this.router.post("/create", notesController.createNote);
        this.router.put("/update", notesController.updateNote);
        this.router.delete("/delete/:note_id", notesController.deleteNote);
    }
}

const notesRouter = new NotesRouter().router;
export default notesRouter;