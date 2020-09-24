import FakeMailProvider from '../../MailProvider/fakes/FakeMailProvider';
import ImailTemplateProvider from '../models/IMailTempleteProvider';

class FakeMailTemplateProvider implements ImailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplateProvider;