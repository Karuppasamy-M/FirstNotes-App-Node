import { Op, where } from "sequelize";
import commonService from "../common/commonService";
import { models } from "../models/models";
import constants from "../common/constants";
import commonEntity from "../common/commonEntity";

class NotifyService {


    public getAllNotifications(req: any, callback: Function) {

        const userId = req.headers.user_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        let condition: any = {
            where: {
                user_id: userId,
                sent_status: req.params.status
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['scheduled_at', 'ASC']]
        }

        commonService.findAll(condition, models.Notify, function (err: any, notifys: any) {
            callback(err, notifys);
        });

    }

    public getAllNotificationsByDate(req: any, callback: Function) {
        const userId = req.headers.user_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        let condition: any = {
            where: {
                user_id: userId,
                sent_status: "waiting"
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['scheduled_at', 'ASC']]
        }

        if (req.params.date_status) {
            const result = commonEntity.getDateRange(req.params.date_status);
            condition.where.scheduled_at = { [Op.between]: [result.from_date, result.to_date] }
        }

        commonService.findAll(condition, models.Notify, function (err: any, notifys: any) {
            callback(err, notifys);
        });
    }

    public createNotify(req: any, callback: Function) {
        const userId = req.headers.user_id;

        const createDate = req.body;
        createDate.user_id = req.headers.user_id;


        commonService.create(createDate, models.Notify, function (err: any, notifys: any) {
            callback(err, notifys);
        });
    }


    public getNotifyForNote(req: any, callback: Function) {
        const userId = req.headers.user_id;
        let condition: any = {
            where: {
                user_id: userId,
                note_id: req.params.note_id
            }
        }
        commonService.findAll(condition, models.Notify, function (err: any, notifys: any) {
            callback(err, notifys);
        });
    }


    public errorService(req: any, err: any) {
        const createData: any = {
            user_id: req.headers.user_id,
            err: err
        }
        commonService.create(createData, models.CommonError, function () { });
    }


}

export const notifyService = new NotifyService();
export default notifyService;
