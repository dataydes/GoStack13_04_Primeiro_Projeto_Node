import { container } from 'tsyringe';

import ISTorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
    disk: DiskStorageProvider,
};

container.registerSingleton<ISTorageProvider>(
    'StorageProvider',
    providers.disk,
);