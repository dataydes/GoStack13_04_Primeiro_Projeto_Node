import AppError from '@shared/errors/App.error';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider =  new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 11, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 11, 10, 13),
            user_id: 'user_id',
            provider_id: 'provider_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        createAppointment.execute({
            date: appointmentDate,
            user_id: 'user_id',
            provider_id: 'provider_id',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: 'user_id',
                provider_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoud not be able to create an appointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: 'user_id',
            provider_id: 'provider_id',
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create an appointments with same user provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: 'user-id',
                provider_id: 'user-id',
            })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointments before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 7),
                user_id: 'user-id',
                provider_id: 'provider-id',
            })
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 18),
                user_id: 'user-id',
                provider_id: 'provider-id',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
})