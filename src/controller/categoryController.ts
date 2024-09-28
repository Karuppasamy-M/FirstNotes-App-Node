import { Request, Response, NextFunction } from 'express';
import responseHandler from '../common/responseHandler';
import categoryService from '../service/categoryService';

class CategoryController {


    public getAllCategory(req: Request, res: Response, next: NextFunction) {
        try {
            categoryService.getAllCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public getAllCategoryerFilter(req: Request, res: Response, next: NextFunction) {
        try {
            categoryService.getAllCategoryFilter(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public createCategory(req: Request, res: Response) {
        try {
            categoryService.createCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    public updateCategory(req: Request, res: Response) {
        try {
            categoryService.updateCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }


    public deleteCategory(req: Request, res: Response) {
        try {
            categoryService.deleteCategory(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const categoryController = new CategoryController();
export default categoryController;
