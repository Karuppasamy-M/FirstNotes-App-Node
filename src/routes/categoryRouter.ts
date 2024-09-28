import { Router } from "express";
import categoryController from "../controller/categoryController";
import authMiddleware from "../middleware/authMiddleware";

class CategoryRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/getall", categoryController.getAllCategory);
        this.router.post("/getall/filter", categoryController.getAllCategoryerFilter);
        this.router.post("/create", categoryController.createCategory);
        this.router.put("/update", categoryController.updateCategory);
        this.router.delete("/delete/:category_id", categoryController.deleteCategory);
    }
}

const categoryRouter = new CategoryRouter().router;
export default categoryRouter;