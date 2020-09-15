import User from '@modules/users/infra/typeorm/entities/Users';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/App.error';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    token: string;
    user: User;
}
@injectable()
class AutheticateUserService {
    constructor(@inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {


        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });
        return {
            token,
            user,
        };
    }
}

export default AutheticateUserService;