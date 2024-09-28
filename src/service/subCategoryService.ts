import { Request } from 'express';
import commonService from '../common/commonService';
import { models } from '../models/models';
import { constants } from '../common/constants';
import { DataTypes, Op, UniqueConstraintError } from 'sequelize';

class SubCategoryService {

    public getAllSubCategory(req: Request, callback: Function) {

        // const userId = req.headers.user_id;
        const categoryId: string = req.params.category_id;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;

        const condition: any = {
            where: {
                // user_id: userId,
                category_id: categoryId,
                archive: false,
                trash: false
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        }

        commonService.findAll(condition, models.SubCategory, function (err: Error, subCategory: any) {
            // if (!subCategory) return callback(new Error("SubCategory not found."), null);
            callback(err, subCategory);
        });
    }

    public getAllSubCategoryFilter(req: Request, callback: Function) {

        const data = req.body;
        const pageNumber: any = req.query.page_number;
        const offset = (pageNumber - 1) * constants.limitNumber;


        const condition: any = {
            where: {
                archive: false,
                trash: false
            },
            limit: constants.limitNumber,
            offset: offset,
            order: [['ctd_date', 'ASC']]
        }

        if (data.req_for == "archive") condition.where.archive = true;
        else if (data.req_for == "trash") condition.where.trash = true;

        if (data.category_id) condition.where.category_id = data.category_id
        if (data.name) condition.where.sub_category_name = { [Op.like]: `%${data.name}%` }
        if (data.from_date && data.to_date) condition.where.ctd_date = { [Op.between]: [data.from_date, data.to_date] }


        commonService.findAll(condition, models.SubCategory, function (err: Error, subCategory: any) {
            // if (!subCategory) return callback(new Error("SubCategory not found."), null);
            callback(err, subCategory);
        });
    }

    public createSubCategory(req: Request, callback: Function) {

        const createDate: any = req.body;

        commonService.create(createDate, models.SubCategory, function (err: Error, subCategory: any) {
            if (err) {
                if (err instanceof UniqueConstraintError) {
                    return callback(new Error((constants.err.subCategoryAlreadyExist)));
                }
                return callback(new Error(constants.err.other));
            }
            callback(err, subCategory);
        });
    }

    public updateSubCategory(req: Request, callback: Function) {

        const updateDate: any = req.body;

        const condition: any = {
            where: {
                sub_category_id: updateDate.sub_category_id
            }
        }

        commonService.update(updateDate, condition, models.SubCategory, function (err: Error, subCategory: any) {
            if (err) {
                if (err instanceof UniqueConstraintError) {
                    return callback(new Error((constants.err.subCategoryNameAlreadyExist)));
                }
                return callback(new Error(constants.err.other));
            }
            callback(err, subCategory);
        });
    }

    public deleteSubCategory(req: Request, callback: Function) {

        // const userId = req.headers.user_id;
        const subCategoryId: string = req.params.sub_category_id;

        const condition: any = {
            where: {
                // user_id: userId,
                sub_category_id: subCategoryId
            }
        }

        commonService.destroy(condition, models.SubCategory, function (err: Error, subCategory: any) {
            callback(err, subCategory);
        });
    }

}


export const subCategoryService = new SubCategoryService();
export default subCategoryService;