import User from '../infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
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

        await this.cacheProvider.invalidatePrefix(`providers-list`);

        return user;
    }

}

export default CreateUserService;