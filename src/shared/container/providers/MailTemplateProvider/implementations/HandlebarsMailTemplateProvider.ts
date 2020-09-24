import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import ImailTemplateProvider from '../models/IMailTempleteProvider';

class HandlebarsMailTemplateProvider implements ImailTemplateProvider {
    public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
        const parseTemplate = handlebars.compile(template);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;