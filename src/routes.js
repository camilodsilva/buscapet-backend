import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ShelterController from './app/controllers/ShelterController';
import PetController from './app/controllers/PetController';
import IntentController from './app/controllers/IntentController';

import UserValidation from './app/middlewares/UserValidation';
import ShelterValidation from './app/middlewares/ShelterValidation';
import PetValidation from './app/middlewares/PetValidation';

import Auth from './app/middlewares/Auth';

const routes = new Router();

routes.post('/users', UserValidation.store, UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(Auth.guard);

// todo: implement the user delete
routes.put('/users', UserValidation.update, UserController.update);

// shelters routes
routes.get('/shelters', ShelterController.index);
routes.post('/shelters', ShelterValidation.store, ShelterController.store);
routes.put('/shelters/:id', ShelterValidation.update, ShelterController.update);
routes.delete('/shelters/:id', ShelterController.delete);

// pets routes
routes.get('/pets', PetController.index);
routes.post('/pets', PetValidation.store, PetController.store);
routes.put('/pets/:id', PetValidation.update, PetController.update);
routes.delete('/pets/:id', PetController.delete);

// intent routes
routes.get('/intents', IntentController.index);
routes.post('/intents', IntentController.store);
routes.delete('/intents/:id', IntentController.delete);

export default routes;
