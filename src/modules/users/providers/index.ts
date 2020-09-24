import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashprovider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);