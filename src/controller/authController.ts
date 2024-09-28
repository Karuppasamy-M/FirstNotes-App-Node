import { Request, Response, NextFunction } from 'express';
import authService from '../service/authService';
import responseHandler from '../common/responseHandler';

class AuthController {

    async signup(req: Request, res: Response) {
        try {
            authService.signup(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    async login(req: Request, res: Response) {
        try {
            authService.login(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    async loginWithGoogle(req: Request, res: Response) {
        try {
            authService.loginWithGoogle(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            authService.logout(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

    async deleteAccount(req: Request, res: Response) {
        try {
            authService.deleteAccount(req, function (err: Error, response: Response) {
                const result = responseHandler.handler(req, response, err);
                res.send(result);
            });
        } catch (err) {
            const result = responseHandler.handler(req, null, err);
            res.send(result);
        }
    }

}

export const authController = new AuthController();
export default authController;