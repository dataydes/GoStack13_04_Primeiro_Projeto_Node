import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTempleteProvider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
    handlebears: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebears,
);