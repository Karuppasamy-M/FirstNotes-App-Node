import { Request } from 'express';
import commonService from '../common/commonService';
import { models } from '../models/models';
import constants from '../common/constants';
import { Op, UniqueConstraintError } from 'sequelize';
import * as async from 'async';

class TaskService {

    public getAllTask(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const subCategoryId = req.params.sub_category_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                user_id: userId,
                sub_category_id: subCategoryId,
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };

        commonService.findAll(condition, models.Task, function (err: Error, task: any) {
            // if (!task) return callback(new Error("Task not found."), null);
            callback(err, task);
        });
    }

    public getAllTaskFilter(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                user_id: userId,
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };

        if (data.title) condition.where.title = { [Op.like]: `%${data.title}%` }
        if (data.from_date && data.to_date) condition.where.ctd_date = { [Op.between]: [data.from_date, data.to_date] }
        if (data.priority_id) condition.where.note_priority_id = data.priority_id


        commonService.findAll(condition, models.Task, function (err: Error, task: any) {
            // if (!task) return callback(new Error("Task not found."), null);
            callback(err, task);
        });
    }

    public createTask(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        let createDate: any = req.body;
        createDate.user_id = userId;

        commonService.create(createDate, models.Task, function (err: Error, task: any) {
            if (err) {
                if (err instanceof UniqueConstraintError) {
                    return callback(new Error((constants.err.taskAlreadyExist)));
                }
                return callback(new Error(constants.err.other));
            }
            callback(err, task);
        });
    }

    public updateTask(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const updateDate = req.body;


        async.waterfall([
            function (waterfallCallback: Function) {
                if (updateDate.notify_data) {

                    updateDate.notify_data.user_id = userId;

                    commonService.create(updateDate.notify_data, models.Notify, function (err: Error, notify: any) {
                        waterfallCallback(err, notify);
                    });
                } else {
                    waterfallCallback(null, null);
                }
            },
            function (result: any, waterfallCallback: Function) {
                const condition: any = {
                    where: {
                        user_id: userId,
                        task_id: updateDate.task_id
                    }
                }

                commonService.update(updateDate, condition, models.Task, function (err: Error, task: any) {
                    if (err) {
                        if (err instanceof UniqueConstraintError) {
                            return callback(new Error((constants.err.taskNameAlreadyExist)));
                        }
                        return callback(new Error(constants.err.other));
                    }
                    waterfallCallback(err, task);
                });
            },
        ], function (err: any, result: any) {
            callback(err, result)
        });


    }


    public deleteTask(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const taskId = req.params.task_id;

        const condition: any = {
            where: {
                user_id: userId,
                task_id: taskId
            }
        }

        commonService.destroy(condition, models.Task, function (err: Error, task: any) {
            callback(err, task);
        });
    }

}


export const taskService = new TaskService();
export default taskService;