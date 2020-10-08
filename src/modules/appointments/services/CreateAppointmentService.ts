import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/App.error';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }

    public async execute({
        date,
        provider_id,
        user_id
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError('You can not create an appointment on a past date.');
        }

        if (user_id === provider_id) {
            throw new AppError('You can not create an appointment with yourself');
        }
        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError('ypu can only create appointments between 8am and 5pm');
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('Este horário já está agendado.');

        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
        console.log("Agendamento Criado no Postgres, Registrando o agendamento no MongoDB para " + dateFormatted);
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`,
        });
        console.log("Agendamento criado.");

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
                appointmentDate, 'yyyy-M-d')}`);

        return appointment;
    }
}

export default CreateAppointmentService;