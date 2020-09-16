import { container } from 'tsyringe';
import IHashProvider from './models/IHashprovider';
import BCryptHashProvider from '../HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);