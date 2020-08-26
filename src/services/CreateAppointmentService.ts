import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    provider: string;
    date: Date;

}

/**
 * DEpendency Inversion (SOLID)
 */
class CreateAppointmentService {
    private appointmentRepositoy: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentRepositoy = appointmentsRepository;
    }
    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepositoy.findByDate(
            appointmentDate);


        if (findAppointmentInSameDate) {
            throw Error('Este horário já está agendado.');
        }

        const appointment = this.appointmentRepositoy.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;