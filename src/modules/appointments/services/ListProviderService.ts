import { inject, injectable } from "tsyringe"

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userReposiroty: IUsersRepository,
    ) { }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.userReposiroty.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}
export default ListProvidersService;