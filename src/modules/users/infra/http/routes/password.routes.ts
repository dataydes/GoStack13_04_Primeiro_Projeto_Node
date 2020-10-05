import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordCntroller from '../controllers/ForgotPasswordController';
import ResetPasswordCntroller from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordCntroller();
const resetPasswordController = new ResetPasswordCntroller();

passwordRouter.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    },
}), forgotPasswordController.create);
passwordRouter.post('/reset', celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmatioin: Joi.string().required().valid(Joi.ref('password')),
    },
}), resetPasswordController.create);

export default passwordRouter;