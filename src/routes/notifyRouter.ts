import { Router } from "express";
import notifyController from "../controller/notifyController";

class NotifyRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/getall/:status", notifyController.getAllNotifications);
        this.router.get("/getall/bydate/:date_status", notifyController.getAllNotificationsByDate);
        this.router.get("/getnotify/:note_id", notifyController.getNotifyForNote);
        this.router.post("/create", notifyController.createNotify);
    }

}

const notifyRouter = new NotifyRouter().router;
export default notifyRouter;
