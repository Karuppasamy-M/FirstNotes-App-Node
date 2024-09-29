
import { Request } from 'express';
import commonService from '../common/commonService';
import { models } from '../models/models';
import * as jwt from 'jsonwebtoken';
import * as async from 'async';
import { constants } from '../common/constants';
import commonEntity from '../common/commonEntity';
import { UniqueConstraintError } from 'sequelize';

class AuthService {

    public signup(req: Request, callback: Function) {

        console.log("Signup Api");

        const data: any = req.body;
        const token = jwt.sign({ userId: 1 }, constants.jwtKey.secretKey, { algorithm: 'HS512' });
        data.token = token;

        commonService.create(data, models.User, function (err: Error, user: any) {
            if (err) {
                if (err instanceof UniqueConstraintError) {
                    return callback(new Error((err.errors[0]?.message) ?? constants.err.other));
                }
                return callback(new Error(constants.err.other));
            }
            callback(err, user);
        });
    }

    // public login(req: Request, callback: Function) {
    //     const data: any = req.body;

    //     async.waterfall([
    //         function (waterfallCallback: Function) {
    //             const condition: any = {
    //                 where: {
    //                     email: data.email
    //                 }
    //             }

    //             commonService.findOne(condition, models.User, function (err: Error, user: any) {
    //                 if (err) return waterfallCallback(new Error(constants.err.other), null);
    //                 if (!user) return waterfallCallback(new Error(constants.err.userDoesNotExist), null);
    //                 if (user.password != data.password) return waterfallCallback(new Error("Wrong password"), null);
    //                 waterfallCallback(null, user);
    //             });

    //         }, function (user: any, waterfallCallback: Function) {

    //             const token = jwt.sign({ userId: user.id }, constants.jwtKey.secretKey, { algorithm: 'HS512' });
    //             const condition: any = {
    //                 where: {
    //                     id: user.id
    //                 }
    //             }
    //             const updateData: any = {
    //                 token: token,
    //                 last_login_date: commonEntity.currentTime()
    //             }

    //             commonService.update(updateData, condition, models.User, function (err: Error, token: any) {
    //                 if (err) return waterfallCallback(new Error(constants.err.other), null)
    //                 waterfallCallback(null, user);
    //             });
    //         }
    //     ], function (err, result) {
    //         callback(err, result);
    //     });
    // }

    public login(req: Request, callback: Function) {
        const data: any = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                const condition: any = {
                    where: {
                        mobile_number: data.mobile_number
                    }
                }

                commonService.findOne(condition, models.User, function (err: Error, user: any) {
                    if (err) return waterfallCallback(new Error(constants.err.other), null);
                    if (!user) return waterfallCallback(new Error(constants.err.userDoesNotExist), null);
                    if (user.password != data.password) return waterfallCallback(new Error("Wrong password"), null);
                    waterfallCallback(null, user);
                });

            }, function (user: any, waterfallCallback: Function) {

                const token = jwt.sign({ userId: user.id }, constants.jwtKey.secretKey, { algorithm: 'HS512' });
                user.token = token;
                const condition: any = {
                    where: {
                        id: user.id
                    }
                }
                const updateData: any = {
                    token: token,
                    last_login_date: commonEntity.currentTime()
                }

                commonService.update(updateData, condition, models.User, function (err: Error, userDtl: any) {
                    if (err) return waterfallCallback(new Error(constants.err.other), null)
                    waterfallCallback(null, user);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    }

    public loginWithGoogle(req: Request, callback: Function) {
        const data: any = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                const condition: any = {
                    where: {
                        email: data.email
                    }
                }

                commonService.findOne(condition, models.User, function (err: Error, user: any) {
                    if (err) return waterfallCallback(new Error(constants.err.other), null);
                    waterfallCallback(null, user);
                });
            }, function (user: any, waterfallCallback: Function) {

                const token = jwt.sign({ userId: 1 }, constants.jwtKey.secretKey, { algorithm: 'HS512' });
                if (user) {
                    user.token = token;
                    const condition: any = {
                        where: {
                            id: user.id
                        }
                    }
                    const updateData: any = {
                        token: token,
                        last_login_date: commonEntity.currentTime()
                    }

                    commonService.update(updateData, condition, models.User, function (err: Error, token: any) {
                        if (err) return waterfallCallback(new Error(constants.err.other), null)
                        waterfallCallback(null, user);
                    });
                } else {

                    commonService.create(data, models.User, function (err: Error, user: any) {
                        if (err) {
                            if (err instanceof UniqueConstraintError) {
                                return waterfallCallback(new Error((err.errors[0]?.message) ?? constants.err.other));
                            }
                            return waterfallCallback(new Error(constants.err.other));
                        }
                        user.token = token;
                        waterfallCallback(err, user);
                    });
                }
            }
        ], function (err: any, result: any) {
            callback(err, result);
        })
    }

    public logout(req: Request, callback: Function) {

        const userId: any = req.headers.user_id;

        const condition: any = {
            where: {
                id: userId
            }
        }

        const updateData: any = {
            token: null,
            last_logout_date: commonEntity.currentUtcTime()
        }

        commonService.update(updateData, condition, models.User, function (err: Error, user: any) {
            callback(err, user);
        });
    }

    public deleteAccount(req: Request, callback: Function) {
        const userId: any = req.headers.user_id;

        const condition: any = {
            where: {
                id: userId
            }
        }
        commonService.destroy(condition, models.User, function (err: Error, user: any) {
            callback(err, user);
        });
    }

}

const authService = new AuthService();
export default authService;
