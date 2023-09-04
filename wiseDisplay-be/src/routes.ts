import { Router } from 'express';

import { GameController } from './controllers/Game.controller';

export const router = Router();

router.use("/games", GameController.routes);