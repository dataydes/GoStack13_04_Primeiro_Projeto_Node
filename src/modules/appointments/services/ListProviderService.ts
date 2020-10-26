import { inject, injectable } from "tsyringe"
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/Users';
import { classToClass } from "class-transformer";

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userReposiroty: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`);
        // let users; // pulando o cache.
        if (!users) {
            users = await this.userReposiroty.findAllProviders({
                except_user_id: user_id,
            });
            console.log('A query no banco foi feita.');
            await this.cacheProvider.save(
                `providers-list:${user_id}`,
                classToClass(users),
            );
        }

        return users;
    }
}

export default ListProvidersService;