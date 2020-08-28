import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

interface Request {
    provider_id: string;
    date: Date;

}

/**
 * DEpendency Inversion (SOLID)
 */
class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate);


        if (findAppointmentInSameDate) {
            throw Error('Este horário já está agendado.');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;