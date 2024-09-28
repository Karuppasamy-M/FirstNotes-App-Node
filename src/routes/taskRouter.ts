import { Router } from "express";
import taskController from "../controller/taskController";

class TaskRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/getall/:sub_category_id", taskController.getAllTask);
        this.router.post("/getall/filter", taskController.getAllTaskFilter);
        this.router.post("/create", taskController.createTask);
        this.router.put("/update", taskController.updateTask);
        this.router.delete("/delete/:task_id", taskController.deleteTask);
    }
}

const taskRouter = new TaskRouter().router;
export default taskRouter;