import loggerService from "../service/loggerService";
import notifyService from "../service/notifyService";
import constants from "./constants";
import * as _ from 'lodash';

export class ResponseHandler {


    handler(req: any, res: any, err: any) {

        var response = {} as any;
        let query: any = req.query;

        if (_.isError(err) || !_.isEmpty(err)) {
            response = {
                status: false,
                message: err.message ? err.message : 'Internal Error',
                code: 202,
                // data: err
            };

            if (err?.name?.search("Sequelize") > -1) response.message = "Internal error.";
            if (err?.name === "SequelizeValidationError") response.data = err.message;

            // this.createCommonLog(response, req, res)

        } else if ((!_.isEmpty(res)) || (!_.isString(res))) {

            response = {
                status: true,
                code: 200,
                message: (res?.msg) ? res.msg : 'Success',
                data: res
            };

        } else {
            response = {
                status: true,
                code: 201,
                message: 'Data Empty',
                data: res
            };
        }

        if (_.isError(err)) {
            response.full_error = err;
            loggerService.createErrorLog(req, res, err);
        }

        delete response.full_error;
        return response;

    }

    // handler(req: any, res: any, err: any) {

    //     var response = {} as any;
    //     if (err) {
    //         response = {
    //             status: false,
    //             message: err?.message ? err.message : 'Internal Error',
    //             code: 202,
    //         };

    //         if (err?.name?.search("Sequelize") > -1) response.message = constants.err.other;
    //         if (err?.name === "SequelizeValidationError") response.data = err.message;
    //         notifyService.errorService(req, err);

    //     } else if (res) {
    //         response = {
    //             status: true,
    //             code: 200,
    //             message: (res?.msg) ? res.msg : 'Success',
    //             data: res
    //         };
    //     } else {
    //         response = {
    //             status: true,
    //             code: 201,
    //             message: 'Data Empty',
    //             data: res
    //         };
    //     }


    //     if (err) {
    //         response.full_error = err;
    //         loggerService.createErrorLog(req, res, err);
    //     }

    //     delete response?.full_error;
    //     return response;
    // }
}

const responseHandler = new ResponseHandler();
export default responseHandler;