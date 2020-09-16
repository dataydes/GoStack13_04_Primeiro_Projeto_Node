import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/App.error';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashprovider';
interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(@inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }
    public async execute(
        { name, email, password }: IRequest): Promise<User> {
        const checkUserExistes = await this.usersRepository.findByEmail(email);

        if (checkUserExistes) {
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }

}

export default CreateUserService;