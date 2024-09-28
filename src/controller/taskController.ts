import { Request, Response, NextFunction } from 'express';
import responseHandler from '../common/responseHandler';
import taskService from '../service/taskService';

class TaskController {


    public getAllTask(req: Request, res: Response, next: NextFunction) {
        try {
            taskService.getAllTask(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllTaskFilter(req: Request, res: Response, next: NextFunction) {
        try {
            taskService.getAllTaskFilter(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createTask(req: Request, res: Response) {
        try {
            taskService.createTask(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public updateTask(req: Request, res: Response) {
        try {
            taskService.updateTask(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }


    public deleteTask(req: Request, res: Response) {
        try {
            taskService.deleteTask(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const taskController = new TaskController();
export default taskController;
