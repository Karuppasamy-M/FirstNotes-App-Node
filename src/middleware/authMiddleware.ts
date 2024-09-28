import { NextFunction } from "express";
import jwtUtils from "../utils/auth/jwtUtils";
import commonService from "../common/commonService";
import { models } from "../models/models";
// import * as _ from 'lodash';

class AuthMiddleware {



   public sessionVerifyMiddleware(req: any, res: any, next: NextFunction) {


      let tokenFromHeader: string = req.headers['x-access-token'];
      let current_date = req.headers['current-date'];
      let utc_offset = req.headers['utc-offset'];
      if (req.headers['app_version']) var app_version = req.headers['app_version'];

      if (!tokenFromHeader) {
         var error = new Error('Token is not detected');

         var response = {
            status: false,
            message: 'Auth Error',
            code: 400,
            err: error.message
         };

         return res.status(400).send(response);
      }

      jwtUtils.jwtVerify(tokenFromHeader, function (err: any, decode: any) {

         var error = new Error('Authendication Expired , Please login again');

         var errResponse = {
            status: false,
            message: 'Auth Error',
            code: 400,
            err: error.message
         };

         // if (_.isError(err)) return res.status(400).send(errResponse);

         // req.session = {
         //     user_id: 1,
         // }
         // return next();
         commonService.findOne({ where: { key: decode.redisId } }, models.User, function (err: any, redisValues: any) {

            if (err) return res.status(400).send(errResponse);
            if (!redisValues) return res.status(400).send(errResponse);

            var JsonDecode = redisValues.payload;

            if (tokenFromHeader === JsonDecode.token) {
               JsonDecode.utc_offset = utc_offset;
               JsonDecode.app_version = app_version;
               JsonDecode.current_date = current_date;
               JsonDecode.session_from = "Delivery Staff";
               req.session = JsonDecode;
               // req.session = {
               //     delivery_staff_id: JsonDecode.delivery_staff_id,
               //     full_name: JsonDecode.full_name,
               //     role_id: JsonDecode.role_id,
               //     utc_offset: utc_offset,
               //     current_date: current_date
               // };
               return next();
            }

            errResponse.err = 'Your session is terminated as we have detected another login.Re-login to continue.';
            return res.status(400).send(errResponse);

         });
      });

   }


}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;

