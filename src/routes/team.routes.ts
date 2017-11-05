import { Express, Request, Response } from 'express';

export function routes(app: Express) {
  app.get('/api/teams', (req: Request, res: Response) => {
  });
}