import { Router } from 'express';

import ForgotPasswordCntroller from '../controllers/ForgotPasswordController';
import ResetPasswordCntroller from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordCntroller();
const resetPasswordController = new ResetPasswordCntroller();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;