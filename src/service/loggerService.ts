import commonService from "../common/commonService";
import { models } from "../models/models";

class LoggerService {

    public createErrorLog(req: any, res: any, err: any) {

        const createData: any = {
            user_id: req.headers?.user_id,
            status_code: req.status_code,
            server_status_code: req.code,
            header: req?.headers,
            request: req,
            response: res,
            api_url: req?.originalUrl,
            method: req.method,
            err_message: res?.message,
            err: err
        }
        commonService.create(createData, models.CommonError, function () { });
    }


}

export const loggerService = new LoggerService();
export default loggerService;
