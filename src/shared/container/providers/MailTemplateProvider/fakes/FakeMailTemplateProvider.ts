import FakeMailProvider from '../../MailProvider/fakes/FakeMailProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import ImailTemplateProvider from '../models/IMailTempleteProvider';

class FakeMailTemplateProvider implements ImailTemplateProvider {
    public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;