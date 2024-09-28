
import { Request, Response, NextFunction } from 'express';
import responseHandler from '../common/responseHandler';
import notesService from '../service/notesService';

class NotesController {

    public getAllNotes(req: Request, res: Response) {
        try {
            notesService.getAllNotes(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllNotesByTag(req: Request, res: Response) {
        try {
            notesService.getAllNotesByTag(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllNotesFilter(req: Request, res: Response) {
        try {
            notesService.getAllNotesFilter(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getRecentNotes(req: Request, res: Response) {
        try {
            notesService.getRecentNotes(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createNote(req: Request, res: Response) {

        try {
            notesService.createNote(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public updateNote(req: Request, res: Response) {
        try {
            notesService.updateNote(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public deleteNote(req: Request, res: Response) {
        try {
            notesService.deleteNote(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const notesController = new NotesController();
export default notesController;