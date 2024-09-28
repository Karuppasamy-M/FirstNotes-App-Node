import { Request, Response, NextFunction } from 'express';
import { models } from '../models/models';
import commonService from '../common/commonService';
import * as async from 'async';
import { Op, UniqueConstraintError, where } from 'sequelize';
import constants from '../common/constants';

type WaterfallCallback = (err: Error | null, result?: any) => void;

class NotesService {

    public getAllNotes(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const subCategoryId = req.params.sub_category_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                user_id: userId,
                sub_category_id: subCategoryId
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']],
        }

        commonService.findAll(condition, models.Notes, function (err: Error, notes: any) {
            callback(err, notes);
        });

        // async.parallel({
        //     notes: function (parallelCallback: Function) {

        //         commonService.findAll(condition, models.Notes, function (err: Error, notes: any) {
        //             parallelCallback(err, notes);
        //         });
        //     },
        //     tasks: function (parallelCallback: Function) {

        //         commonService.findAll(condition, models.Task, function (err: Error, notes: any) {
        //             parallelCallback(err, notes);
        //         });

        //     },
        // }, function (err: any, result: any) {
        //     callback(err, result);
        // });
    }

    public getAllNotesByTag(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const data: any = req.body;
        const reqFor: any = data.req_for;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                user_id: userId,
                [reqFor]: true
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        }

        commonService.findAll(condition, models.Notes, function (err: Error, notes: any) {
            callback(err, notes);
        });


    }

    public getAllNotesFilter(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;


        async.waterfall([
            function (waterfallCallback: Function) {
                if (data.label_ids) {
                    const condition: any = {
                        where: {
                            user_id: userId,
                            label_id: data.label_ids
                        },
                        attributes: ['note_id']
                    }

                    commonService.findAll(condition, models.NoteLabels, function (err: Error, noteIds: any) {
                        waterfallCallback(err, noteIds);
                    });
                } else {
                    waterfallCallback(null, null);
                }
            },
            function (nodeIds: any, waterfallCallback: Function) {

                const condition: any = {
                    where: {},
                    limit: constants.limitNumber,
                    offset: offset,
                    order: [['ctd_date', 'ASC']]
                }

                if (nodeIds != undefined && nodeIds) {
                    let noteIdArray: any = [];
                    nodeIds.forEach((item: any) => { noteIdArray.push(item.note_id); });
                    noteIdArray = Array.from(new Set(noteIdArray));
                    if (noteIdArray) condition.where.note_id = noteIdArray;
                }

                if (data.title) condition.where.title = { [Op.like]: `%${data.title}%` }
                if (data.from_date && data.to_date) condition.where.ctd_date = { [Op.between]: [data.from_date, data.to_date] }
                if (data.priority_id) condition.where.note_priority_id = data.priority_id


                commonService.findAll(condition, models.Notes, function (err: Error, notes: any) {
                    waterfallCallback(err, notes);
                });
            },
        ], function (err: any, result: any) {
            callback(err, result);
        });

    }

    public getRecentNotes(req: Request, callback: Function) {
        const userId = req.headers.user_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                user_id: userId,
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['udt_date', 'DESC']]
        }

        commonService.findAll(condition, models.Notes, function (err: Error, notes: any) {
            callback(err, notes);
        });

    }

    public createNote(req: Request, callback: Function) {

        const createDate = req.body;
        createDate.user_id = req.headers.user_id;

        async.waterfall([
            function (waterfallCallback: Function) {
                if (createDate.notify_ids) {
                    commonService.bulkCreate(createDate, models.Notify, function (err: Error, notify: any) {
                        waterfallCallback(err, notify);
                    });

                } else {
                    waterfallCallback(null, []);
                }
            }, function (EmptyData: any, waterfallCallback: Function) {

                commonService.create(createDate, models.Notes, function (err: Error, category: any) {
                    if (err) {
                        if (err instanceof UniqueConstraintError) {
                            return callback(new Error((constants.err.noteAlreadyExist)));
                        }
                        return callback(new Error(constants.err.other));
                    }
                    waterfallCallback(err, category);
                });
            }
        ], function (err: any, result: any) {
            callback(err, result);
        });
    }

    public updateNote(req: Request, callback: Function) {
        const userId = req.headers.user_id;
        const updateDate = req.body;

        const condition: any = {
            where: {
                user_id: userId,
                category_id: updateDate.category_id,
                note_id: updateDate.note_id
            }
        }


        async.waterfall([
            function (waterfallCallback: Function) {

                if (updateDate.label) {
                    updateDate.label.user_id = 1;
                    updateDate.label.note_id = updateDate.note_id;

                    commonService.create(updateDate.label, models.NoteLabels, function (err: Error, noteLabel: any) {
                        waterfallCallback(err, noteLabel);
                    });
                } else {
                    waterfallCallback(null, []);
                }
            },
            function (result: any, waterfallCallback: Function) {
                if (updateDate.notify_list) {

                    commonService.bulkCreate(updateDate.notify_list, models.Notify, function (err: Error, notify: any) {
                        waterfallCallback(err, notify);
                    });
                } else {
                    waterfallCallback(null, []);
                }
            },
            function (result: any, waterfallCallback: Function) {

                commonService.update(updateDate, condition, models.Notes, function (err: Error, category: any) {
                    waterfallCallback(err, category);
                });
            },

        ], function (err: any, result: any) {
            callback(err, result);
        });

    }

    public deleteNote(req: Request, callback: Function) {
        const noteId = req.params.note_id;

        const condition: any = {
            where: {
                note_id: noteId
            }
        }

        commonService.destroy(condition, models.Notes, function (err: Error, category: any) {
            callback(err, category);
        });
    }

}


export const notesService = new NotesService();
export default notesService;