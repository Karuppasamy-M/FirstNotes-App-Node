import { Request } from 'express';
import commonService from '../common/commonService';
import { models } from '../models/models';
import constants from '../common/constants';
import { Op, UniqueConstraintError } from 'sequelize';

class CategoryService {

    public getAllCategory(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;


        const condition: any = {
            where: {
                user_id: userId,
                archive: false,
                trash: false
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        }

        commonService.findAll(condition, models.Category, function (err: Error, category: any) {
            if (!category) return callback(new Error("Category not found."), null);
            callback(err, category);
        });
    }

    public getAllCategoryFilter(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const data = req.body;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;


        const condition: any = {
            where: {
                user_id: userId,
                archive: false,
                trash: false
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        }

        if (data.req_for == "archive") condition.where.archive = true;
        else if (data.req_for == "trash") condition.where.trash = true;


        if (data.name) condition.where.category_name = { [Op.like]: `%${data.name}%` }
        if (data.from_date && data.to_date) condition.where.ctd_date = { [Op.between]: [data.from_date, data.to_date] }


        commonService.findAll(condition, models.Category, function (err: Error, category: any) {
            // if (!category) return callback(new Error("Category not found."), null);
            callback(err, category);
        });
    }

    public createCategory(req: Request, callback: Function) {

        const createDate = req.body;
        createDate.user_id = req.headers.user_id;

        commonService.create(createDate, models.Category, function (err: Error, category: any) {
            if (err) {
                if (err instanceof UniqueConstraintError) {
                    return callback(new Error((constants.err.categoryAlreadyExist)));
                }
                return callback(new Error(constants.err.other));
            }
            callback(err, category);
        });
    }

    public updateCategory(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const updateDate = req.body;
        updateDate.user_id = userId;

        const condition: any = {
            where: {
                user_id: userId,
                category_id: updateDate.category_id
            }
        }

        commonService.update(updateDate, condition, models.Category, function (err: Error, category: any) {
            callback(err, category);
        });
    }

    public deleteCategory(req: Request, callback: Function) {

        const userId = req.headers.user_id;
        const categoryId = req.params.category_id;

        const condition: any = {
            where: {
                user_id: userId,
                category_id: categoryId
            }
        }

        commonService.destroy(condition, models.Category, function (err: Error, category: any) {
            callback(err, category);
        });
    }

}


export const categoryService = new CategoryService();
export default categoryService;