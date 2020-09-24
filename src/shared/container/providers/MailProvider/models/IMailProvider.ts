import ISendMailDTO from '../dtos/ISendMailDTO';


export default interface IMailProvider {
    sendMail(data: ISendMAilDTO): Promise<void>;
}

