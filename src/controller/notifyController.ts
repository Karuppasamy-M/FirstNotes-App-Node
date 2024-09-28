import responseHandler from "../common/responseHandler";
import notifyService from "../service/notifyService";
import { Request, Response } from 'express';

class NotifyController {


    public getAllNotifications(req: Request, res: Response) {
        try {
            notifyService.getAllNotifications(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllNotificationsByDate(req: Request, res: Response) {
        try {
            notifyService.getAllNotificationsByDate(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getNotifyForNote(req: Request, res: Response) {
        try {
            notifyService.getNotifyForNote(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createNotify(req: Request, res: Response) {
        try {
            notifyService.createNotify(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }


}

const notifyController = new NotifyController();
export default notifyController;