import { Request, Response, Router } from 'express';
import { GameDAL } from '../dal/GameDAL.class';
import { IApiGameAdapter } from '../api-adapters/IApiGame.adapter';
import { IConfig } from '../schema/blueprints/IConfig';

export class GameController {

    public static get routes(): Router {
        const router = Router();
        router.post('/all', this.getGames);
        router.post('/nfl', this.getNFLGames)

        return router;
    }

    public static async getNFLGames(req: Request, res: Response){
        try {
            const config: IConfig = req.body;
             
            const nflGames = await GameDAL.getNFLGames();

            return res.status(200).json(IApiGameAdapter(nflGames, config));
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
     }

    public static async getGames(req: Request, res: Response){
       try {
            const config: IConfig = req.body;
            
            const [nfl, nhl, nba, mlb] = await Promise.all([
                GameDAL.getNFLGames(),
                GameDAL.getNHLGames(),
                GameDAL.getNBAGames(),
                GameDAL.getMLBGames()
            ]);

            const games = [...nfl, ...nhl, ...nba, ...mlb];

            return res.status(200).json(IApiGameAdapter(games, config));
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
}