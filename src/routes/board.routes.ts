import { Express, Request, Response } from 'express';
import Board from "../models/domain/board";
export function routes(app: Express){
  app.get('/api/boards',(req: Request,res: Response)=>{
    Board.findAll().then(board => res.status(200).send(board));
  });
}