import { Request, Response } from 'express';
import responseHandler from '../common/responseHandler';
import labelService from '../service/labelService';

class LabelController {


    public getAllLabel(req: Request, res: Response) {
        try {
            labelService.getAllLabel(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createLabel(req: Request, res: Response) {
        try {
            labelService.createLabel(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public updateLabel(req: Request, res: Response) {
        try {
            labelService.updateLabel(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }


    public deleteLabel(req: Request, res: Response) {
        try {
            labelService.deleteLabel(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const labelController = new LabelController();
export default labelController;
