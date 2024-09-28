import { Router } from 'express';
import subCategoryController from '../controller/subcategoryController';



class SubCategoryRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get('/getall/:category_id', subCategoryController.getAllSubCategory);
        this.router.post('/getall/filter/:category_id', subCategoryController.getAllSubCategoryFilter);
        this.router.post('/create', subCategoryController.createSubCategory);
        this.router.put('/update', subCategoryController.updateSubCategory);
        this.router.delete('/delete/:sub_category_id', subCategoryController.deleteSubCategory);
    }
}

const subCategoryRouter = new SubCategoryRouter().router;
export default subCategoryRouter;