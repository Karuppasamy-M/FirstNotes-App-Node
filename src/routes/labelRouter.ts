import { Router } from "express";
import labelController from "../controller/labelController";

class LabelRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/getall", labelController.getAllLabel);
        this.router.post("/create", labelController.createLabel);
        this.router.put("/update", labelController.updateLabel);
        this.router.delete("/delete/:label_id", labelController.deleteLabel);
    }
}

const labelRouter = new LabelRouter().router;
export default labelRouter;