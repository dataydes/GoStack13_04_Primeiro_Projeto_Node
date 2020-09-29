import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilytyController from '../controllers/providerMonthAvailabilytyController';
import ProviderDayAvailabilytyController from '../controllers/providerDayAvailabilytyController';


const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilytyController = new ProviderMonthAvailabilytyController();
const providerDayAvailabilytyController = new ProviderDayAvailabilytyController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilytyController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilytyController.index);

export default providersRouter;