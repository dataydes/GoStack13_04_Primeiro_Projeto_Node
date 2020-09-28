import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import ListProvidersService from './ListProviderService';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}
type IResponse = Array<{
    day: number;
    avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }
    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
        const appointments = this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        });
        console.log(appointments);

        return [{ day: 1, avaliable: false }];
    }
}

export default ListProviderMonthAvailabilityService;