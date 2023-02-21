import { Router, Request, Response } from 'express';
import { loginHandler } from './controllers/auth.controller';
import  * as cardController from './controllers/card.controller';
import { deserializeUser } from './middleware/deserializeUser';
import { requireUser } from './middleware/requireUser';
import { validate } from './middleware/validate';
import { cardSchema } from './schemas/card.schema';
import { loginSchema } from './schemas/login.schema';

const rotaLogin = Router();
rotaLogin.post('/login', validate(loginSchema), loginHandler);

const rotaCard = Router();
rotaCard.use(deserializeUser, requireUser);
rotaCard.get('/cards', cardController.getAllCardsHandler);
rotaCard.post('/cards', validate(cardSchema), cardController.insertCardHandler);
rotaCard.put('/cards/:id', validate(cardSchema), cardController.updateCardHandler);
rotaCard.delete('/cards/:id', cardController.deleteCardHandler);

const rotaTeste = Router();
rotaLogin.post('/teste', (req, res) => res.send('funcionando'));

export default {
    rotaLogin,
    rotaCard,
    rotaTeste
};