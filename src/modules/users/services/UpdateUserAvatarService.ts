
import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/App.error';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider) { }

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {


        const user = await this.usersRepository.findById(user_id);
        console.log("Verificando ID do usuário ", user_id);
        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }
        if (user.avatar) {
            console.log("Deletando arquivo antigo.");
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;
        console.log("Atualizando o nome do arquivo para: ", filename);
        await this.usersRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;