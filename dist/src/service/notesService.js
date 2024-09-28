"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesService = void 0;
const models_1 = require("../models/models");
const commonService_1 = __importDefault(require("../common/commonService"));
const async = __importStar(require("async"));
const sequelize_1 = require("sequelize");
const constants_1 = __importDefault(require("../common/constants"));
class NotesService {
    getAllNotes(req, callback) {
        const userId = req.headers.user_id;
        const subCategoryId = req.params.sub_category_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId,
                sub_category_id: subCategoryId
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Notes, function (err, notes) {
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
    getAllNotesByTag(req, callback) {
        const userId = req.headers.user_id;
        const data = req.body;
        const reqFor = data.req_for;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId,
                [reqFor]: true
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Notes, function (err, notes) {
            callback(err, notes);
        });
    }
    getAllNotesFilter(req, callback) {
        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        async.waterfall([
            function (waterfallCallback) {
                if (data.label_ids) {
                    const condition = {
                        where: {
                            user_id: userId,
                            label_id: data.label_ids
                        },
                        attributes: ['note_id']
                    };
                    commonService_1.default.findAll(condition, models_1.models.NoteLabels, function (err, noteIds) {
                        waterfallCallback(err, noteIds);
                    });
                }
                else {
                    waterfallCallback(null, null);
                }
            },
            function (nodeIds, waterfallCallback) {
                const condition = {
                    where: {},
                    limit: constants_1.default.limitNumber,
                    offset: offset,
                    order: [['ctd_date', 'ASC']]
                };
                if (nodeIds != undefined && nodeIds) {
                    let noteIdArray = [];
                    nodeIds.forEach((item) => { noteIdArray.push(item.note_id); });
                    noteIdArray = Array.from(new Set(noteIdArray));
                    if (noteIdArray)
                        condition.where.note_id = noteIdArray;
                }
                if (data.title)
                    condition.where.title = { [sequelize_1.Op.like]: `%${data.title}%` };
                if (data.from_date && data.to_date)
                    condition.where.ctd_date = { [sequelize_1.Op.between]: [data.from_date, data.to_date] };
                if (data.priority_id)
                    condition.where.note_priority_id = data.priority_id;
                commonService_1.default.findAll(condition, models_1.models.Notes, function (err, notes) {
                    waterfallCallback(err, notes);
                });
            },
        ], function (err, result) {
            callback(err, result);
        });
    }
    getRecentNotes(req, callback) {
        const userId = req.headers.user_id;
        const pageNumber = req.query.page_number;
        const offset = (pageNumber - 1) * constants_1.default.limitNumber;
        const condition = {
            where: {
                user_id: userId,
            },
            limit: constants_1.default.limitNumber,
            offset: offset,
            order: [['udt_date', 'DESC']]
        };
        commonService_1.default.findAll(condition, models_1.models.Notes, function (err, notes) {
            callback(err, notes);
        });
    }
    createNote(req, callback) {
        const createDate = req.body;
        createDate.user_id = req.headers.user_id;
        async.waterfall([
            function (waterfallCallback) {
                if (createDate.notify_ids) {
                    commonService_1.default.bulkCreate(createDate, models_1.models.Notify, function (err, notify) {
                        callback(err, notify);
                    });
                }
                else {
                    callback(null, null);
                }
            }, function () {
                commonService_1.default.create(createDate, models_1.models.Notes, function (err, category) {
                    callback(err, category);
                });
            }
        ], function (err, result) {
        });
    }
    updateNote(req, callback) {
        const userId = req.headers.user_id;
        const updateDate = req.body;
        const condition = {
            where: {
                user_id: userId,
                category_id: updateDate.category_id,
                note_id: updateDate.note_id
            }
        };
        async.waterfall([
            function (waterfallCallback) {
                if (updateDate.label_id) {
                    const createDate = {
                        user_id: userId,
                        note_id: updateDate.note_id,
                        label_id: updateDate.label_id,
                    };
                    commonService_1.default.findOrCreate(createDate, createDate, models_1.models.NoteLabels, function (err, noteLabel) {
                        waterfallCallback(err, noteLabel);
                    });
                }
                else {
                    waterfallCallback(null, null);
                }
            },
            function (waterfallCallback) {
                if (updateDate.notify_data) {
                    updateDate.notify_data.user_id = userId;
                    commonService_1.default.create(updateDate.notify_data, models_1.models.Notify, function (err, notify) {
                        waterfallCallback(err, notify);
                    });
                }
                else {
                    waterfallCallback(null, null);
                }
            },
            function (waterfallCallback) {
                commonService_1.default.update(updateDate, condition, models_1.models.Notes, function (err, category) {
                    callback(err, category);
                });
            },
        ], function (err, result) {
            callback(err, result);
        });
    }
    deleteNote(req, callback) {
        const noteId = req.params.note_id;
        const condition = {
            where: {
                note_id: noteId
            }
        };
        commonService_1.default.destroy(condition, models_1.models.Notes, function (err, category) {
            callback(err, category);
        });
    }
}
exports.notesService = new NotesService();
exports.default = exports.notesService;
