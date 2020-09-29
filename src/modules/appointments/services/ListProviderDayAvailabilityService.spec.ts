import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvaliabilityservice';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaliability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvaliability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvaliability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
    });

    it('should be able to list the Day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        const availability = await listProviderDayAvaliability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });
        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: true },
            { hour: 10, available: false },
            { hour: 11, available: true },
        ]))
    })


})