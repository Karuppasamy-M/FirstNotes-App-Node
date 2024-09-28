import { Request } from 'express';
import commonService from '../common/commonService';
import { models } from '../models/models';

class LabelService {

    public getAllLabel(req: Request, callback: Function) {

        const userId = req.headers.user_id;

        const condition: any = {
            where: {
                user_id: userId
            }
        }

        commonService.findAll(condition, models.Label, function (err: Error, label: any) {
            callback(err, label);
        });
    }

    public createLabel(req: Request, callback: Function) {

        const userId = req.headers.user_id;

        let createDate: any = req.body;
        createDate.user_id = userId;

        commonService.create(createDate, models.Label, function (err: Error, label: any) {
            callback(err, label);
        });
    }

    public updateLabel(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const updateDate = req.body;

        const condition: any = {
            where: {
                user_id: userId,
                label_id: updateDate.label_id
            }
        }

        commonService.update(updateDate, condition, models.Label, function (err: Error, label: any) {
            callback(err, label);
        });
    }

    public deleteLabel(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const labelId = req.params.label_id;

        const condition: any = {
            where: {
                user_id: userId,
                label_id: labelId
            }
        }

        commonService.destroy(condition, models.Label, function (err: Error, label: any) {
            callback(err, label);
        });
    }

}


export const labelService = new LabelService();
export default labelService;