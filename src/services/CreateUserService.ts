import { getRepository } from 'typeorm';
import User from '../models/Users';
import { hash } from 'bcryptjs';
import AppError from '../errors/App.error';

interface Request {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {

    public async execute(
        { name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExistes = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExistes) {
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await usersRepository.save(user);
        return user;
    }

}

export default CreateUserService;