import { Router } from 'express';
import authController from '../controller/authController';

class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.post('/signup', authController.signup);
        this.router.post('/login', authController.login);
        this.router.post('/login/google', authController.loginWithGoogle);
        this.router.get('/logout', authController.logout);
        this.router.delete('/delete', authController.deleteAccount);
    }
}

const authRouter = new AuthRouter().router;
export default authRouter;