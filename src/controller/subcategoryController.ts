import { Request, Response } from 'express';
import responseHandler from '../common/responseHandler';
import subCategoryService from '../service/subCategoryService';

class SubCategoryController {

    public getAllSubCategory(req: Request, res: Response) {
        try {
            subCategoryService.getAllSubCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllSubCategoryFilter(req: Request, res: Response) {
        try {
            subCategoryService.getAllSubCategoryFilter(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createSubCategory(req: Request, res: Response) {
        try {
            subCategoryService.createSubCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public updateSubCategory(req: Request, res: Response) {
        try {
            subCategoryService.updateSubCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }


    public deleteSubCategory(req: Request, res: Response) {
        try {
            subCategoryService.deleteSubCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const subCategoryController = new SubCategoryController();
export default subCategoryController;
